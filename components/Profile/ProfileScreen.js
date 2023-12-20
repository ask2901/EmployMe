import { View, Text, ScrollView, Image, Touchable } from "react-native";
import React from "react";
import Profile from "./ProfileData";
import Colors from "./ProfileColors";
import Icon from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native-gesture-handler";
import Heading from "./Heading/Heading";
import CustomIcon from "./CustomIcon/CustomIcon";
import ShowExperience from "./ShowExperience/ShowExperience";
import ShowAllFooter from "./ShowAllFooter/ShowAllFooter";
import SectionHeading from "./SectionHeading/SectionHeading";
import ShowEducation from "./ShowEducation/ShowEducation";
import ShowSkill from "./ShowSkill/ShowSkill";

const ProfileScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ backgroundColor: "#ffff", marginBottom: 10 }}>
        <Image source={Profile.INFO.banner} style={{ width: "100%", height: 100 }} />
        <Image source={Profile.INFO.profile_picture} style={{ width: 100, height: 100, borderRadius: 100, borderColor: "white", bottom: 50, left: 15 }} />
        <View style={{ marginTop: -45, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 28, fontWeight: "bold", color: Colors.BLACK }}>{Profile.INFO.name}</Text>
          <Text style={{ fontSize: 16, color: Colors.BLACK }}>{Profile.INFO.bio}</Text>
          <Text style={{ color: Colors.GRAY, marginBottom: 10, marginTop: 4 }}>Talks about - {Profile.INFO.talksAbout.map((item) => `${item} `)}</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 16, color: Colors.BLUE, fontWeight: "bold" }}>{Profile.INFO.followers} followers</Text>
            <Icon name="dot-single" size={16} color={Colors.GRAY} />
            <Text style={{ fontSize: 16, color: Colors.BLUE, fontWeight: "bold" }}>{Profile.INFO.connections > 500 ? "500+" : Profile.INFO.connections} connections</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", marginVertical: 16 }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.BLUE,
              padding: 10,
              borderRadius: 100,
              width: 140,
              paddingVertical: 3,
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <Text style={{ fontSize: 16, color: Colors.WHITE }}>Open To</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.WHITE,
              borderColor: Colors.GRAY,
              borderWidth: 1,
              padding: 10,
              borderRadius: 100,
              width: 140,
              paddingVertical: 3,
              alignItems: "center",
            }}
            onPress={() => {}}
          >
            <Text style={{ fontSize: 16, color: Colors.GRAY }}>Add Section</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 100,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {}}
          >
            <Icon name="dots-three-horizontal" size={19} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          marginBottom: 10,
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Heading title="About" />
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon name="pencil" size={22} color={Colors.GRAY} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: "justify",
            color: Colors.BLACK,
            fontSize: 15,
            paddingHorizontal: 5,
            marginVertical: 10,
          }}
          numberOfLines={4}
          elipsizeMode="tail"
        >
          {Profile.ABOUT}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.WHITE,
          padding: 10,
          marginBottom: 10,
          paddingBottom: 0,
        }}
      >
        <SectionHeading title="Experience" />
        <ShowExperience />
        <ShowAllFooter />
      </View>
      <View style={{
          backgroundColor: Colors.WHITE,
          padding: 10,
          marginBottom: 10,
          paddingBottom: 0,
        }}>
        <SectionHeading title="Education" />
        <ShowEducation />
      </View>
      <View style={{
          backgroundColor: Colors.WHITE,
          padding: 10,
          marginBottom: 10,
          paddingBottom: 0,
        }}>
        <SectionHeading title="Skills" />
        <ShowSkill />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
