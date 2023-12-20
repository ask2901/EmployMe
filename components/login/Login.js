import { View, Text } from "react-native";
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
} from "./login.style";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Fontisto, Ionicons, Octicons } from "@expo/vector-icons";
import { useState } from "react";
import { router, useRouter } from "expo-router";
import { auth } from "../../FireBaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleLogin, Home } from "../../components";
import { ScrollView } from "react-native-gesture-handler";
const { primary, brand, darkLight } = Colors;
import { COLORS, icons, images, SIZES } from "../../constants";
import ForgotPassword from './../ForgotPassword/ForgotPassword';

const Login = ({ navigation }) => {
  const router = useRouter();
  const [hidePassword, setHidePassword] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState();

  const Auth = auth;

  const handleNavigate = () => {
    navigation.navigate("Signup");
  };

  goToForgotPassword = () => navigation.navigate('ForgotPassword')

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
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              const signin = async () => {
                try {
                  const response = await signInWithEmailAndPassword(auth, values.email, values.password);
                  // console.log(response);
                  // router.push("/home");
                  // navigation.navigate("Home", { itemId: response.user.uid });
                  navigation.navigate("MyDrawer", {
                    screen: "Home",
                    params: { itemId: response.user.uid },
                  });
                } catch (error) {
                  alert(error);
                }
              };
              signin();
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
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
                
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />

                <GoogleLogin isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} user={user} setUser={setUser} />

                <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={() => handleNavigate()}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>
                <ExtraView>
                  <TextLink onPress={() => goToForgotPassword()}>
                    <TextLinkContent>Forgot Password?</TextLinkContent>
                  </TextLink>
                </ExtraView>

              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </View>
  );
};

export default Login;
