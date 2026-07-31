import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../../confige/firebase'


const AiUserMenu = () => {
    const user = auth.currentUser
  return (
    <View>
          <Text>{user?.displayName}</Text>
          
          <View>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
          </View>
          
          <View>
              <TouchableOpacity></TouchableOpacity>
          </View>
    </View>
  )
}

export default AiUserMenu;