import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { login } from '../userAuth/users';
import { useNavigation } from '@react-navigation/native';


const LoginPage = () => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('')
  const navigation = useNavigation()

  const handleLogin = async () => {
    console.log('Login: ', emailLogin, passwordLogin)
    try {
      const log = await login(emailLogin, passwordLogin)
    } catch (error) {
      Alert.alert('Логін або пароль не співвпадають!')
    }
  
  }
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder='Email' placeholderTextColor="#dbd6d6" onChangeText={(text) => setEmailLogin(text)} value={emailLogin}/>
        <TextInput style={styles.input} placeholder='Password' placeholderTextColor="#dbd6d6" onChangeText={(text) => setPasswordLogin(text)} value={passwordLogin}/>
        <TouchableOpacity style={styles.button} onPress={handleLogin}><Text style={styles.buttonText}>Sign In</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ffff",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: "TitleBold",
    fontSize: 30,
    color: "#0000ff",
    marginBottom: 20,
  },
  formContainer: { width: "100%" },
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
    backgroundColor: "#0000ff",
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

export default LoginPage