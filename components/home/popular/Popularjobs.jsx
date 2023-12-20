import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";

import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "./../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const { isLoading , data, error } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  
  
  const [selectedJob,setSelectedJob]=useState();
  const router=useRouter();
  
  const handleCardPress=(item)=>{
    router.push(`/job-details/${item.job_id}`)
    setSelectedJob(item.job_id);
  }

  const [activeJobType, setActiveJobType] = useState("Full-time");
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
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
            <View style={styles.tabsContainer}>
            <FlatList
              data={data}
              renderItem={({item})=>(
                <PopularJobCard 
                    item={item}
                    selectedJob={selectedJob}
                    handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={item=>item?.job_id}
              contentContainerStyle={{columnGap: SIZES.medium}}
              horizontal
            />
            </View>
        )}
        
      </View>
    </View>
  );
};

export default Popularjobs;
