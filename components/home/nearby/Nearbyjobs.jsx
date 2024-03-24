import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";

import styles from './nearbyjobs.style';
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import NearbyJobCard from './../../common/cards/nearby/NearbyJobCard';
import Chaap from '../../../assets/Items/Chaap.jpeg';
import Roti from '../../../assets/Items/Roti.jpeg';
import Pizza from '../../../assets/Items/pizza.jpeg';
import Naan from '../../../assets/Items/Naan.jpeg';
import Rice from '../../../assets/Items/Rice.jpeg';

const Nearbyjobs = () => {
  const { data, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const isLoading = false;
  const router=useRouter();

  const [activeJobType, setActiveJobType] = useState("Full-time");
  const FoodItems=[Chaap,Roti,Pizza,Naan,Rice];
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Choices</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        { isLoading ? (
          <ActivityIndicator size="large" colors={COLORS.primary}/>
        ) : error ? (
          <Text>Some THing went wrong</Text>)
          : (
            FoodItems?.map((item)=>(
              <NearbyJobCard
                item={item}
                key={item.id}
                // handleNavigate={()=>
                // {
                // router.push(`/job-details/${job.job_id}`)}}
              />
            )) 
        )}
        
      </View>
    </View>
  );
};

export default Nearbyjobs;
