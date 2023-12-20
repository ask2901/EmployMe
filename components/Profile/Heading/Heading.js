import { View, Text } from "react-native";
import React from "react";
import Colors from "../ProfileColors";

const Heading = ({ title, icon }) => {
  return (
    <Text
      style={{
        fontSize: 18,
        fontWeight:'bold',
        color: Colors.BLACK,
      }}
    >
      {title}
    </Text>
  );
};
export default Heading;
