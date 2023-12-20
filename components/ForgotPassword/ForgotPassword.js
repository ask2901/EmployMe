import React, { Component, useCallback, useEffect } from "react";
import { Text, View } from "react-native";
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
} from "../login/login.style";

import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import { auth } from "../../FireBaseConfig";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
const { primary, brand, darkLight } = Colors;
import { COLORS, icons, images, SIZES } from "../../constants";

const ForgotPassword = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const Auth = auth;

  const TextInput = ({ label, icon, hidePassword, setHidePassword, isPassword, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword && (
          <RightIcon onPress={() => setHidePassword(!hidePassword)}>
            <Ionicons name={hidePassword ? "md-eye-off" : "md-eye"} size={30} color={darkLight} />
          </RightIcon>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        padding: SIZES.medium,
      }}
    >
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require("../../assets/images/Logo.png")} />

          <SubTitle>Forgot your password ?</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              const handlePassword = async () => {
                try {
                //   console.log(values.email);
                  await sendPasswordResetEmail(auth, values.email).then(() => {
                    alert("Password reset link sent to your email");
                  });
                } catch (error) {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(errorCode, errorMessage);
                }
              };
              handlePassword();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <TextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="Enter email address here"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  keyboardtype="email-address"
                />

                <Line />

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Send password reset link</ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </View>
  );
};

export default ForgotPassword;
