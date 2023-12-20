import React from 'react';
import {View, Text, Image} from 'react-native';
import Styles from '../Profile.styles';
import Colors from '../ProfileColors';
import Profile from '../ProfileData';

const ShowEducation = ({}) => Profile.EDUCATION.map((item,index) => (
  <View key={index} style={[Styles.flexCenter, { paddingBottom: 10}]}>
    <Image
      source={item.logo}
      style={{height: 50, width: 50, marginHorizontal: 16}}
    />
    <View>
      <Text
        style={{
          fontSize: 17,
          color: Colors.BLACK,
          fontWeight: 'bold',
          width: 250,
        }}>
        {item.college}
      </Text>
      <Text style={{color: Colors.BLACK}}>{item.name}</Text>
      <Text>{item.time}</Text>
    </View>
  </View>
))

export default ShowEducation;