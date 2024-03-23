import { View, Text } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

import React from "react";

import { useEffect } from "react";
import { Colors, StyledButton } from "./login.style";
import { Fontisto } from "@expo/vector-icons";
import { useState } from "react";

import { ButtonText } from "./login.style";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
// import Home from "../../components"

const { primary, brand, darkLight } = Colors;



const GoogleLogin = ({ isSignedIn, setIsSignedIn, user, setUser}) => {
  
  const navigation=useNavigation();

  GoogleSignin.configure({
    webClientId: "252833940027-n9rssal9agjjklebgkfvqj996jsib8rp.apps.googleusercontent.com",
  });

  const router = useRouter();

  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signIn = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in
      .then((user) => {
        // console.log("User info", idToken);
        // if(user.additionalUserInfo.isNewUser==true)
        // {
          firestore()
          .collection("users")
          .doc(user.user.uid)
          .set({
            name: user.additionalUserInfo.profile.given_name,
            email: user.additionalUserInfo.profile.email,
            uid: user.user.uid,
            picture:user.additionalUserInfo.profile.picture,
          })
          .then(() => {
            // console.log("User added!");
          });
        // }
        
        navigation.navigate("MyDrawer",{
          screen:"Home",
          params: {itemId:user.user.uid,
          picUrl:user.additionalUserInfo.profile.picture,}});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <StyledButton google={true} onPress={() => signIn()}>
      <Fontisto name="google" color={primary} size={25} />
      <ButtonText google={true}>Sign in with Google</ButtonText>
    </StyledButton>
  );
};

export default GoogleLogin;
