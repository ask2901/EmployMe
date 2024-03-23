import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import ScreenHeaderBtn, { ChatScreen, ChatHome, ForgotPassword, ProfileScreen } from "../components";

import { COLORS, icons, images, SIZES } from "../constants";
import { Login, Signup, Home, MeetingRoom, Room } from "../components";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firestore from "@react-native-firebase/firestore";

import { Slot } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomDrawer from "../components/CustomDrawer/CustomDrawer";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyDrawer() {
  const [itemId, setItemId] = useState("");

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -25, fontFamily: "Roboto-medium", fontSize: 15 },
        drawerActiveBackgroundColor: "#aa18ea",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          backgroundColor: COLORS.lightWhite,
          headerShadowVisible: false,
          headerTitle: " ",
          headerTitle: " ",
          drawerIcon: ({ focused, size, color }) => <Ionicons name="home-outline" size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ route }) => ({
          headerShown: false,
          drawerIcon: ({ focused, size, color }) => <Ionicons name="person-outline" size={22} color={color} />,
        })}
      />
      <Drawer.Screen
        name="Messages"
        component={ChatHome}
        options={{
          drawerIcon: ({ focused, size, color }) => <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const Main = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Slot />;
  }
  const MyIcon = <Icon name="user-o" size={30} />;

  const handleLogout = () => {
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
  };

  return (
    <NavigationContainer independent={true} onLayout={onLayoutRootView}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            backgroundColor: COLORS.lightWhite,
            headerShadowVisible: false,
            headerTitle: " ",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerStyle: { backgroundColor: COLORS.lightWhite },
            backgroundColor: COLORS.lightWhite,
            headerShadowVisible: false,
            headerTitle: " ",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={({ route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
        <Stack.Screen
          name="ChatHome"
          component={ChatHome}
          options={{
            title: "",
            headerRight: () => <Icon name="user-circle-o" size={30} />,
          }}
        />
        <Stack.Screen
          name="MeetingRooms"
          component={MeetingRoom}
          options={{
            title: "",
            // headerRight: () => (
            //   <TouchableOpacity onPress={handleLogout}>
            //     <Ionicons name="log-out-outline" size={30} />
            //   </TouchableOpacity>
            // ),
            
          }}
        />

        <Stack.Screen name="Room" component={Room} options={{ title: "" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
