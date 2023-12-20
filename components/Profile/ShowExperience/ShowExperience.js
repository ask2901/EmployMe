import { View, Text, Image } from "react-native";
import React from "react";
import Profile from "../ProfileData";
import Colors from "../ProfileColors";
import Icon from "react-native-vector-icons/Entypo";

const ShowExperience = () =>
  Profile.EXPERIENCE.map((item) => (
    <View key={item.id} style={{ flexDirection: "row", alignItems: "center", borderBottomColor: Colors.GRAY, borderBottomWidth: 1, paddingVertical: 10 }}>
      <Image source={item.logo} style={{ width: 50, height: 50, marginRight: 10 }} />
      <View>
        <Text style={{ fontSize: 17, fontWeight: "bold", color: Colors.BLACK }}>{item.title}</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 15, color: Colors.GRAY }}>{item.companyName}</Text>
          <Icon name="dot-single" size={16} color={Colors.GRAY} />
          <Text style={{ fontSize: 15, color: Colors.GRAY }}>{item.jobType}</Text>
        </View>
        <Text style={{ fontSize: 14, color: Colors.GRAY }}>
          {item.startDate} - {item.endDate}
        </Text>
      </View>
    </View>
  ));

export default ShowExperience;
