import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import styles from "./popularjobcard.style";
import { styleProps } from "react-native-web/dist/cjs/modules/forwardedProps";
import { checkImageURL } from "../../../../utils";

const PopularJobCard = ({ item, selectedJob }) => {
  return (
    <TouchableOpacity style={styles.container(selectedJob, item)} onPress={() => handleCardPress(item)}>
      
        <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
          <Image source={require("../../../../assets/profit.png")} resizeMode="contain" style={styles.logoImage} />
        </TouchableOpacity>
        
          <Text style={styles.companyName} numberOfLines={1}>
            {item.Number}
          </Text>
          <View style={styles.infoContainer}>
            <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
              {item.Type}
            </Text>
            {/* <Text style={styles.location}>{item.job_country}</Text> */}
          </View>
        
    </TouchableOpacity>
  );
};

export default PopularJobCard;
