
import {  useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { register } from '../userAuth/users'
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigation = useNavigation()

  const handleRegistration = async  () => {
   
try {
  const res = await register(name, email, password);

  // Если регистрация прошла успешно
  if (res) {
    console.log("Регистрация в Firebase прошла");

    // Используем стандартный alert
    Alert.alert("Успіх", "Ви успішно зареєструвалися!", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);

    navigation.replaceParams('Main')
  }
} catch (error: any) {
  console.log("Ошибка в блоке catch:", error.message);
  Alert.alert("Помилка", "Щось пішло не так");
}
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registration</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#dbd6d6"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#dbd6d6"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#dbd6d6"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegistration}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ffff",
    alignItems: "center",

    paddingTop: 100,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "TitleBold",
    fontSize: 30,
    color: "#41b805",
    marginBottom: 20,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 60,
    justifyContent: "center",
    borderColor: "#8282b3",
    paddingLeft: 15,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 20,
    fontFamily: "TitleLight",
    fontSize: 20,
    color: "#0b0a0a",
  },
  button: {
    width: 150,
    height: 50,
    backgroundColor: "#41b805",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  buttonText: {
    fontFamily: "TitleRegular",
    fontSize: 20,
    color: "white",
  },
});

export default RegistrationPage;
