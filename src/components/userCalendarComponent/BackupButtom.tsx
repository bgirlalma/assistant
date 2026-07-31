import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

const BackupButtom = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        <Ionicons name="return-up-back" size={30} color="#f5f5f5" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 30,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    borderRadius: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default BackupButtom;
