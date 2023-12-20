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
  SubTitle,
  TextLink,
  TextLinkContent,
} from "./signup.style";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router, useRouter } from 'expo-router';
import { auth } from "../../FireBaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";
import { COLORS, icons, images, SIZES } from "../../constants";


const { primary, brand, darkLight } = Colors;

const Signup = ({route,navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const router=useRouter();
  const Auth=auth;


  const handleNavigate=(item)=>{
    navigation.navigate("Login")
  }

  const [dob,setDob] = useState(); // Actual DOB to be sent

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
            <StyledTextInput {...props}/>
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
          }}
        >
    <StyledContainer>
      <StatusBar style="dark" />
      <InnerContainer>
        <SubTitle>Account Signup</SubTitle>

        {show && <DateTimePicker testID="dateTimePicker" value={date} mode="date" is24Hour={true} onChange={onChange}/>}

        <Formik
          initialValues={{ fullName: "", email: "", password: "", dateofBirth: "", confirmPassword: "" }}
          onSubmit={(values) => {
            const signup=async()=>{
              try{
                const user=await createUserWithEmailAndPassword(Auth,values.email,values.password);
                // console.log(user);
              }catch(error){
                console.log(error);
              }
            }
            signup();
            navigation.navigate("Login");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <TextInput
                label="Full Name"
                icon="person"
                placeholder="Aryan Kumar"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                value={values.fullName}
              />
              <TextInput
                label="Email Address"
                icon="mail"
                placeholder="andy@gmail.com"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardtype="email-address"
              />
              <TextInput
                label="Date of Birth"
                icon="calendar"
                placeholder="YYYY - MM - DD"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("dateofBirth")}
                value={dob?dob.toDateString() : ""}
                isDate={true}
                editable={false}
                showDatepicker={showDatepicker}
              />
              <TextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <TextInput
                label="Confirm Password"
                icon="lock"
                placeholder="* * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox>...</MsgBox>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Submit</ButtonText>
              </StyledButton>
              <Line />

              <ExtraView>
                <ExtraText>Already have an account ?</ExtraText>
                <TextLink onPress={(item)=>handleNavigate(item)}>
                  <TextLinkContent> Login</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
    </View>
    </ScrollView>
  );
};

export default Signup;
