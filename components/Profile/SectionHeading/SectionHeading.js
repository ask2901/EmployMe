import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Styles from '../Profile.styles';
import Heading from '../Heading/Heading';
import CustomIcon from '../CustomIcon/CustomIcon';
import Colors from '../ProfileColors';

export default function SectionHeading({title}) {
  return (
    <View
      style={[Styles.flexCenter, {
        justifyContent: 'space-between',
        marginBottom: 10,
      }]}>
      <Heading title={title} />
      <View style={Styles.flexCenter}>
        <TouchableOpacity onPress={() => {}}>
          <CustomIcon
            name="add"
            size={28}
            color={Colors.GRAY}
            style={{marginRight: 10}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <CustomIcon name="pencil" size={22} color={Colors.GRAY} />
        </TouchableOpacity>
      </View>
    </View>
  );
}