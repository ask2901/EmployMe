import { View, Text, ImageBackground } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";

import { FontAwesome, Ionicons } from "@expo/vector-icons";

const CustomDrawer = (props) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: "#8200d6" }}>
        <ImageBackground source={require("../../assets/menu-bg.jpeg")} style={{ padding: 20 }}>
          <Image
            source={require("../../assets/user-profile.jpg")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: "#fff", fontSize: 18, fontFamily: "Roboto-Medium", marginBottom: 5 }}>Aryan Kumar</Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "baseline" }}>
            <Text style={{ color: "#fff", fontFamily: "Roboto-Regular" }}>Admin ZORKO Foods</Text>
            <FontAwesome name="user-o" size={14} color="#fff" />
          </View>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 15, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: "Roboto-Medium" }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ marginLeft: 10, fontSize: 15, fontFamily: "Roboto-Medium" }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
