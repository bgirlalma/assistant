import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../userAuth/users';

const LogoutButton = () => {
  const navigation = useNavigation<any>()


    const handleLogout = () => {
        Alert.alert('Вихід', "Ви впевнені що хочете вийти?", [{
            text: "Скасувати", style: 'cancel'
        }, {
            text:"Вийти",
            style: 'destructive',
            onPress: async () => {
                try {
                    await logout()
                } catch (error) {
                    console.error("Помилка при виході:", error);
                }
            }
        }])
    }
  return (
    <View>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Ionicons name="exit-outline" size={32} color="#887d7d" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6f1",
    marginTop: "auto",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
      alignSelf: "flex-start",
    marginLeft: 15
  },
});

export default LogoutButton