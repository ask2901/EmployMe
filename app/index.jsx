import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useCallback } from "react";
import { useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import { useFonts } from 'expo-font';
import ScreenHeaderBtn, { ChatScreen, ChatHome, ForgotPassword, ProfileScreen } from "../components";

import { COLORS, icons, images, SIZES } from "../constants";
import { Login, Signup ,Home} from "../components";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from "@react-native-firebase/firestore";

import { Slot} from 'expo-router';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




function MyDrawer() {
  const [picUrl, setPicUrl] = useState("");
  const [name, setName] = useState("");

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          backgroundColor: COLORS.lightWhite,
          headerShadowVisible: false,
          headerTitle: " ",
          headerTitle: " ",
        }}
      />
      <Drawer.Screen name="ProfileScreen" component={ProfileScreen}
          options={({ route }) => ({
            headerShown:false,
          })}
        />
    </Drawer.Navigator>
  );
}

const Main=() => {

  const [fontsLoaded] = useFonts({
    DMBold : require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium : require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular : require('../assets/fonts/DMSans-Regular.ttf'),
  })
  
    const onLayoutRootView = useCallback(async()=>{
      if(fontsLoaded)
      {
        await SplashScreen.hideAsync();
      }
    },[fontsLoaded]);
  
    if(!fontsLoaded)
    {
      return <Slot/>;
    }
    const MyIcon = <Icon name="user-o" size={30} />;

  return (
    
    <NavigationContainer independent={true} onLayout={onLayoutRootView}>
      <Stack.Navigator
      initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            backgroundColor: COLORS.lightWhite,
            headerShadowVisible: false,
            headerTitle: " ",
            headerShown:false,
          }}
        />
        <Stack.Screen name="Signup" component={Signup}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          backgroundColor: COLORS.lightWhite,
          headerShadowVisible: false,
          headerTitle:" ",
          headerShown:false,
        }}
      />
        <Stack.Screen name="MyDrawer" component={MyDrawer} 
          options={{headerShown:false,}}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} 
          options={{headerShown:false,}}
        />
        <Stack.Screen name="ChatScreen" component={ChatScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
        
        <Stack.Screen name="ChatHome" component={ChatHome}
          options={{
            title: '',
            headerRight: () => <Icon name="user-circle-o" size={30} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default Main;