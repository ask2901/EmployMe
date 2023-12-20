import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../ProfileColors";
import CustomIcon from "../CustomIcon/CustomIcon";
import Styles from "../Profile.styles";

export default function ShowAllFooter() {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        borderTopColor: Colors.GRAY,
        borderTopWidth: 1,
        paddingVertical: 10,
      }}
    >
      <TouchableOpacity onPress={() => {}} style={Styles.flexCenter}>
        <Text style={{ color: Colors.BLUE, fontWeight: "bold", fontSize: 17 }}>Show All</Text>
        <CustomIcon name="arrow-forward" size={19} color={Colors.BLUE} />
      </TouchableOpacity>
    </View>
  );
}
