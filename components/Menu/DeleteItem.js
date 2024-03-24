import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  ButtonText,
  Colors,
  ExtraText,
  ExtraView,
  InnerContainer,
  LeftIcon,
  Line,
  MsgBox,
  PageLogo,
  PageTitle,
  RightIcon,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton_Image,
  SubTitle,
  TextLink,
  TextLinkContent,
  ButtonText_Image,
} from "./chat.style";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useRouter } from "expo-router";
import { auth } from "../../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, icons, images, SIZES } from "../../constants";
import CustomIcon from "../Profile/CustomIcon/CustomIcon";
import styles from "../../styles/search";
import firestore from "@react-native-firebase/firestore";

const { primary, brand, darkLight } = Colors;

const DeleteItem = ({ route, navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const router = useRouter();
  const Auth = auth;

  const handleNavigate = (item) => {
    navigation.navigate("Login");
  };

  const [dob, setDob] = useState(); // Actual DOB to be sent

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setDob(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const TextInput = ({ label, icon, hidePassword, setHidePassword, isPassword, isDate, showDatepicker, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        {!isDate && <StyledTextInput {...props} />}
        {isDate && (
          <TouchableOpacity onPress={showDatepicker}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}
        {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
          </RightIcon>
        )}
      </View>
    );
  };

  return (
    <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
      <View
        style={{
          flex: 1,
          padding: SIZES.medium,
          justifyContent: "center",
         
        }}
      >
        <StyledContainer>
          <StatusBar />
          <InnerContainer>
            <SubTitle>Delete Items</SubTitle>

            {show && <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange} />}

            <Formik
              initialValues={{ ItemName: "", ItemPrice: "", DiscountPrice: "", Description: "", ImageURL: "" }}
              onSubmit={(values) => {
                const signup = async () => {
                  firestore().collection("Items").add({
                    ItemName: values.ItemName,
                    ItemPrice: values.ItemPrice,
                    DiscountPrice: values.DiscountPrice,
                    Description: values.Description,
                  });
                };
                signup();
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <StyledFormArea>
                  <TextInput icon="person" placeholder="Item Name" placeholderTextColor={darkLight} onChangeText={handleChange("ItemName")} onBlur={handleBlur("fullName")} value={values.ItemName} />
                  
                  {/* <StyledButton_Image onPress={handleSubmit}>
                <ButtonText_Image>Pick Image from Gallery</ButtonText_Image>
              </StyledButton_Image> */}
                  <StyledButton
                    onPress={() => {
                      firestore().collection("Items").doc(values.ItemName).delete().then(() => {
                        console.log("Document successfully deleted!");
                        setFieldValue("ItemName", "");
                      }).catch((error) => {
                        console.error("Error removing document: ", error);
                      });
                    }}
                  >
                    <ButtonText>Delete Item</ButtonText>
                  </StyledButton>

                  <Line />
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
      </View>
    </ScrollView>
  );
};

export default DeleteItem;
