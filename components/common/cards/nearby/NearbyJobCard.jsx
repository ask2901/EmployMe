import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './nearbyjobcard.style';
import { checkImageURL } from '../../../../utils';



const NearbyJobCard = ({item}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={()=> handleNavigate()}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={item}
          resizeMode='contain'
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          Burger
        </Text>
        <Text style={styles.jobType}>Burger</Text>
      </View>
    </TouchableOpacity>
  )
}

export default NearbyJobCard;