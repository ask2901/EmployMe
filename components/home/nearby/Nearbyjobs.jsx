import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";

import styles from './nearbyjobs.style';
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import useFetch from "../../../hook/useFetch";
import NearbyJobCard from './../../common/cards/nearby/NearbyJobCard';


const Nearbyjobs = () => {
  const { data, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const isLoading = false;
  
  
  const router=useRouter();

  const [activeJobType, setActiveJobType] = useState("Full-time");
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
            data?.map((job)=>(
              <NearbyJobCard
                job={job}
                key={`nearby-job-${job?.job_id}`}
                handleNavigate={()=>
                {
                router.push(`/job-details/${job.job_id}`)}}
              />
            )) 
        )}
        
      </View>
    </View>
  );
};

export default Nearbyjobs;
