import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../confige/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const loginUser = async (currentUser: any) => {
    const userToSave = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
    };

    setUser(userToSave);

    await AsyncStorage.setItem(
      "local_user_session",
      JSON.stringify(userToSave),
    );
  };

  const logoutUser = async () => {
    setUser(null);
    await AsyncStorage.removeItem("local_user_session");
  };

  useEffect(() => {
    const init = async () => {
      const cached = await AsyncStorage.getItem("local_user_session");

      if (cached) {
        setUser(JSON.parse(cached));
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    init();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await loginUser(firebaseUser);
      } else {
        // ВАЖНО: теперь это НЕ игнорируем
        setUser(null);
        await AsyncStorage.removeItem("local_user_session");
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);