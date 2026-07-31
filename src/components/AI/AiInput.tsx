import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { addnewEvent } from "../../userAuth/users";
import { useAuth } from "../../hooks/useAuthProvider";

const AiInput = () => {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleSaveEvents = async () => {
    // захист якщо строка порожня, або має просто пробили
    if (!text.trim()) return;
    setLoading(true);
    try {
      const eventDate = new Date(Number(year), Number(month) - 1, Number(day));
      await addnewEvent(text, user.uid, eventDate);

      Alert.alert("Успіх", "Подія додана у ваш календар!");
      setText("");
      setDay("");
      setMonth("");
      setYear("");
    } catch (error: any) {
      Alert.alert(
        "Помилка",
        error.message || "Не вдалося додати подію у календар!",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Які плани?"
          placeholderTextColor="#dbd6d6"
          style={styles.input}
          value={text}
          onChangeText={setText}
          multiline={true}
        />
    
        <View style={styles.inputDataContainer}>
          <TextInput
            placeholder="DD"
            placeholderTextColor="#dbd6d6"
            keyboardType="number-pad"
            maxLength={2}
            value={day}
            onChangeText={setDay}
            style={styles.inputData}
          />
          <TextInput
            placeholder="MM"
            placeholderTextColor="#dbd6d6"
            keyboardType="number-pad"
            maxLength={15}
            value={month}
            onChangeText={setMonth}
            style={styles.inputData}
          />
          <TextInput
            placeholder="YYYY"
            placeholderTextColor="#dbd6d6"
            keyboardType="number-pad"
            maxLength={4}
            value={year}
            onChangeText={setYear}
            style={styles.inputData}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !text.trim() && styles.buttonDisabled]}
          onPress={handleSaveEvents}
          disabled={loading || !text.trim()}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Add Event</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, width: "100%" },
  inputContainer: {
    paddingHorizontal: 20, // Отступы по бокам теперь тут
    width: "100%",
    alignItems: "stretch",
  },
  input: {
    width: 350,
    height: 100,
    borderColor: "#e6e6f1",
    paddingHorizontal: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    fontFamily: "TitleLight",
    fontSize: 20,
    color: "#eee6e6",
    textAlignVertical: "top",
  },
  inputDataContainer: {
    flexDirection: "row",
    // justifyContent: 'center',
    gap: 10,
  },
  inputData: {
    width: 110,
    height: 45,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e6e6f1",
    paddingHorizontal: 12,
    textAlign: "center",
    fontSize: 16,
    color: "#353232",
  },
  button: {
    width: 150,
    height: 60,
    backgroundColor: "#12e288",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonDisabled: {
    backgroundColor: "#a1f2cf", // Бледный цвет, если кнопка неактивна
  },
  buttonText: { fontFamily: "TitleRegular", fontSize: 20, color: "white" },
});

export default AiInput;
