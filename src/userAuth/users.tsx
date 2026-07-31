import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../confige/firebase";
import Constants from "expo-constants";
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from "firebase/firestore";

const OPENAI_API_KEY = Constants.expoConfig?.extra?.ASSISTANT_OPENAI_API_KEY;

// Register
export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await updateProfile(user, {
      displayName: name,
    });
    console.log("New User!", user);
    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      isLogin: true,
    };
  } catch (error: any) {
    console.log("Error registration message", error.message);
    throw error;
  }
};

// Login
export const login = async (email: string, password: string) => {
  try {
    const log = await signInWithEmailAndPassword(auth, email, password);
    const user = log.user;
    return {
      uid: user.uid,
      email: user.email,
    };
  } catch (error: any) {
    throw error;
  }
};

// Logout
export const logout = async () => {
  return await signOut(auth);
};

// для перекладу аудіо( голосового помічника)
export const transcribeAudio = async (uri: string) => {
  try {
    const formData = new FormData();

    const fileUri = uri.startsWith("file://") ? uri : `file://${uri}`;

    formData.append("file", {
      uri: fileUri,
      name: "audio.m4a",
      type: "audio/m4a",
    } as any);

    formData.append("model", "whisper-1");

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: formData,
    });

    const data = await res.json();

    // додаємо перевірку на помилку від сервера
    if (!res.ok) {
      console.log("OpenAI Error:", data);
      return "Error: " + (data.error?.message || "Unknown error");
    }

    console.log("TEXT FROM SERVER:", data.text);
    return data.text;
  } catch (error) {
    console.log("transcribe error", error);
  }
};

// додаємо події 
export const addnewEvent = async (text: string, userId: string, eventsDate: Date) => {
  try {
    if (!userId) {
      throw new Error("ID користувача не знайдено!");
    }

    eventsDate: Timestamp.fromDate(eventsDate);


    // Строим путь на основе переданного userId
    const eventsRef = collection(db, `users/${userId}/events`);
  

    const docRef = await addDoc(eventsRef, {
      userID: userId,
      text: text.trim(),
      time: Timestamp.now(),
      eventsDate: Timestamp.fromDate(eventsDate),
    });

    console.log("Event created!");
    return docRef;
  } catch (error: any) {
    console.error("Помилка при додавані події:", error);
    throw error;
  }
};

// Отримуємо події користувача
export const getUserEvents = (
  userId: string,
  callback: (events: any[]) => void,
) => {
  if (!userId) {
    callback([]);
    return () => {};
  }

  const eventsRef = collection(db, "users", userId, "events");

  const unsubscribe = onSnapshot(eventsRef, (snapshot) => {

    const events = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(events);
  });
  return unsubscribe;
};

// видаляємо подію
export const removeEvent = async (userID: string, eventID: string) => {
  await deleteDoc(doc(db, 'users', userID, "events", eventID))
}