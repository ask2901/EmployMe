import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import { useState } from "react";
import { Stack, useRouter } from "expo-router";



import { COLORS, icons, images, SIZES } from "../../constants";
import { Login, Signup } from "../../components";

const Auth = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          backgroundColor: COLORS.lightWhite,
          headerShadowVisible: false,
          headerTitle:" ",
          headerShown:false,
        }}
      />
      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Signup />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Auth;
