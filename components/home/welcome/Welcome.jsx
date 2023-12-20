import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, SafeAreaView, LogBox, ScrollView } from "react-native";
import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { SIZES, icons } from "../../../constants";
import { router } from "expo-router";

const Welcome = ({searchTerm,setSearchTerm,handleClick,name}) => {
  const router = useRouter();
  const jobTypes = [
    {
      name: "Full-Time",
      id: "1",
    },
    { name: "Part-Time", id: "2" },
    { name: "Contract", id: "3" },
  ];

  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello {name}</Text>
        <Text style={styles.welcomeMessage}>Find your Perfect Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput style={styles.searchInput} value={searchTerm} onChangeText={(text) => {setSearchTerm(text)}} placeholder="What are you looking for?" />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} resizeMode="contain" style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              style={styles.tab(activeJobType, item.name)}
              onPress={() => {
                setActiveJobType(item.name);
                router.push(`/search/${item.name}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item.name)}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
