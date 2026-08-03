import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import BackupButtom from '../components/userCalendarComponent/BackupButtom';

const UserSetting = () => {
  return (
    <View style={styles.container}>
      <>
        <BackupButtom/>
      </>
      <Text style={styles.title}>Тут ти можешь змінити своє ім'я, пошту або пароль</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 60,
    backgroundColor: "#2A7B9B",
  },
  title: {
    fontFamily: "TitleRegular",
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    marginRight: 10
  },
});

export default UserSetting;