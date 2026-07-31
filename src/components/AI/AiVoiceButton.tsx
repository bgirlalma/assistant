
import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Audio } from "expo-av";
import { transcribeAudio } from "../../userAuth/users";

const AiVoiceButton = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [uri, setUri] = useState<string | null>(null);

const startRecording = async () => {
  try {
    if (recording) return; // ⛔ защита от двойного старта

    const permission = await Audio.requestPermissionsAsync();
    if (!permission.granted) return;

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    const { recording: newRecording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY,
    );

    setRecording(newRecording);
  } catch (error) {
    console.log("start error", error);
  }
};

 const stopRecording = async () => {
   try {
     if (!recording) return;

     await recording.stopAndUnloadAsync();

     const uri = recording.getURI();
     setUri(uri);

     setRecording(null);

     const text = await transcribeAudio(uri!)
      console.log("FINAL TEXT:", text);
   } catch (error) {
     console.log("stop error", error);
   }
 };

  return (
    <View style={{ alignItems: "center" }}>
      <TouchableOpacity
        onPressIn={startRecording}
        onPressOut={stopRecording}
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: recording ? "#f06861" : "#12e288",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {recording ? "Listening..." : "Hold"}
        </Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20 }}>
        {uri ? uri : "No recording yet"}
      </Text>
    </View>
  );
};

export default AiVoiceButton;