import { StreamCall, StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";

import { Call, CallContent, StreamVideoEvent, useStreamVideoClient } from "@stream-io/video-react-native-sdk";

import Spinner from "react-native-loading-spinner-overlay";

import Toast from "react-native-toast-message";

import { Ionicons } from "@expo/vector-icons";

import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { PORT, STREAM_API_KEY, STREAM_API_SECRET, API_URL } from "@env";
import { useRouter } from "expo-router";


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default function App({ route, navigation }) {

  const router = useRouter();

  const apiKey = STREAM_API_KEY;
  const [token, setToken] = useState(null);
  const [callId, setCallId] = useState(null);

  const { itemId } = route.params;
  // console.log(itemId);

  const user = { id: itemId };

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("default", callId);
  call.join({ create: true });

  const authToken = async () => {
    const result = await fetch(`http://192.168.1.7:3000/video-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: itemId, email: "aryan290102@gmail.com" }),
    });

    const json = await result.json();
    console.log("token:", json);
    setToken(json.token);
    setCallId(json.user.id);
    console.log("callId:", callId);
  };

  useEffect(() => {
    authToken();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
    });

    const unsubscribe = client.on("all", (event) => {
      console.log(event);

      if (event.type === "call.reaction_new") {
        console.log(`New reaction: ${event.reaction}`);
      }

      if (event.type === "call.session_participant_joined") {
        console.log(`New user joined the call: ${event.participant}`);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User joined",
          text2: `Say hello to ${user} 👋`,
        });
      }

      if (event.type === "call.session_participant_left") {
        console.log(`Someone left the call: ${event.participant}`);
        const user = event.participant.user.name;
        Toast.show({
          text1: "User left",
          text2: `Say goodbye to ${user} 👋`,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const shareMeeting = async () => {
    Share.share({
      message: `Join my meeting: myapp://(inside)/(room)/${id}`,
    });
  };

  const goToHomeScreen = async () => {
		router.back();
	};

  return (
    <StreamVideo client={client}>
      <View style={{ flex: 1 }}>
        <Spinner visible={!call} />

        <StreamCall call={call}>
          <View style={styles.container}>
            <CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

            {WIDTH > HEIGHT ? (
              <View style={styles.videoContainer}>
                <Text>Tablet chat</Text>
              </View>
            ) : (
              <Text>Mobile chat</Text>
            )}
          </View>
        </StreamCall>
      </View>
    </StreamVideo>
    
  );
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
	},
	videoContainer: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: '#fff'
	},

	topView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});


// http://10.0.2.2:3000/playlist
//  192.168.1.7
