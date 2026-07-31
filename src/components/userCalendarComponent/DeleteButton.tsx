import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { useAuth } from "../../hooks/useAuthProvider";
import { removeEvent } from '../../userAuth/users';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type DeleteButtonProps = {
  eventId: string
}

const DeleteButton = () => {
    const { user } = useAuth();
  
  const handleRemove = () => {
      Alert.alert('Видалення', "Ви дійсно хочете видалити подію?", [{
               text: "Скасувати", style: 'cancel'
           }, {
               text:"Видалити",
               style: 'default',
               onPress: async () => {
                 try {
                   if (!user) return
                   await removeEvent(user.uid, eventId);
                   } catch (error) {
                       console.error("Помилка при видаленні:", error);
                   }
               }
           }])
  }
  return (
    <View>
      <TouchableOpacity onPress={handleRemove}>
        <MaterialIcons name="highlight-remove" size={25} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}



export default DeleteButton