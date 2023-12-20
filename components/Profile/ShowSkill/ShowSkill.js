import { View, Text } from "react-native";
import React from "react";
import Colors from "../ProfileColors";
import Profile from "../ProfileData";
import CustomIcon from "../CustomIcon/CustomIcon";

const ShowSkill = () => 
  Profile.SKILLS.map((item, index) => (
    <View key={index} style={{
        borderBottomColor: Colors.LIGHT_GRAY,
        borderBottomWidth: 1,
        paddingVertical: 5,
    }}>
      <Text
        style={{
          fontSize: 19,
          fontWeight: "bold",
          color: Colors.BLACK,
        }}
      >
        {item.title}
      </Text>
      <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}
      >
        <CustomIcon name="people" size={34} color={Colors.GRAY} 
            style={{
                marginRight: 10,
            }}
        />
        <Text style={{
            fontSize: 16,
        }}>{item.endorsements}
        {item.endorsements>1 ?' endorsements':' endorsement'}</Text>
      </View>
    </View>
  ));

export default ShowSkill;
