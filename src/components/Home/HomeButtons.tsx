import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamenrs } from "../../types/navigation";

type Nav = NativeStackNavigationProp<RootStackParamenrs>

const HomeButtons = () => {
    const navigation = useNavigation<Nav>()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.signIn}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.signInTitle}>Sing in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUp}
        onPress={() => navigation.navigate("Registration")}
      >
        <Text style={styles.signUpTitle}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginTop: 20
  },
  signIn: {
    width: 100,
    height: 40,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FBC02D",
  },
  signInTitle: {
    fontFamily: "TitleRegular",
    fontSize: 16,
    color: "white",
  },
  signUp: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#F4511E",
  },
  signUpTitle: {
    fontFamily: "TitleRegular",
    fontSize: 16,
    color: "white",
  },
});

export default HomeButtons;
