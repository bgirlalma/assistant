import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Voice from "@react-native-voice/voice";


const useVoiceHook = () => {
    const [text, setText] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    useEffect(() => {
      
    }, [])
    
    const start = async () => {
      
        }; 

        const stop = async () => {
         
        }
    
  return (
    <View>
      <Text>useVoiceHook</Text>
    </View>
  )
}

export default useVoiceHook