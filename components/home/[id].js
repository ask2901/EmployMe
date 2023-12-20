import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from '@rneui/themed';

import { COLORS, icons, images, SIZES } from "../../constants";
import {Login, Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from "../../components";



const Home = ({route,navigation}) => {
  const {itemId,picUrl} = route.params;
  const router = useRouter();
  const [name, setName] = useState("");
  // const [picUrl, setPicUrl] = useState("");
  var url=null;

  const Drawer = createDrawerNavigator();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // console.log("params", itemId);
    firestore()
      .collection("users")
      .where("uid", "==", itemId)
      .get()
      .then((querySnapshot) => {
        // console.log("Total users: ", querySnapshot.size);
        querySnapshot.forEach((documentSnapshot) => {
          setName(documentSnapshot.data().name);
          // setPicUrl(documentSnapshot.data().picture);
        }); 
      });
  }, []);

  const handleOnPress = () => {
    console.log("picUrl",picUrl);
    navigation.navigate("ChatHome", {
      itemId: itemId,
      picUrl:picUrl,
    });
  }

  useEffect(() => {
    navigation.setOptions({
        // headerRight: () => <ScreenHeaderBtn iconUrl={picUrl!=""?{uri:picUrl}:icons.menu} dimension="80%" />,
        headerRightContainerStyle:{marginRight:SIZES.medium},
        headerRight: () => <Icon name='chatbubble-ellipses' type='ionicon' onPress={handleOnPress} />,
    });
  }, [navigation]);

  const handlePress = () => {
    
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          {/* <Login/> */}
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            name={name}
            handleClick={() => {
              if (searchTerm) {
                // router.push(`/search/${searchTerm}`);
                navigation.navigate("search", {
                  searchTerm: {searchTerm},
                });
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
