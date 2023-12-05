import React, { useCallback, useState, useEffect } from "react";
import { StyleSheet, Image, ImageBackground, StatusBar } from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { StackNavigationProp } from "@react-navigation/stack";

import { Block, Card, Text, Input, Icon, Button } from "../../components";
import { icons, images, COLORS, SIZES } from "../../constants";

import deviceSize from "../../utils/deviceSize";
import { useStaturBar } from "../../utils/hooks";
import Constants from "expo-constants";
import axios from "axios";
import useAuthStore from "../../store/auth/authStore";
import { RootStackParamList } from "../../types/navigation-types";
const { CHINGU_BASE_ENDPOINT } = Constants.expoConfig.extra;

type SignInScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SignIn"
>;
type SignInProps = {
  navigation: SignInScreenNavigationProp;
};

// Custom RATION
const RATION = {
  xlarge: 1.3,
  large: 0.95,
  normal: 1.05,
  small: 1.05,
  xsmall: 1.05,
};

const CONTAINER_HEIGHT = (558 * 100) / SIZES.height / RATION[deviceSize];

const SignIn: React.FC<SignInProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean | boolean[]>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  useStaturBar("light-content");

  const { setToken } = useAuthStore();

  const handleGoogleLogin = async () => {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   const token = userInfo.idToken;
    //   // Send the token to your backend
    //   await axios.post(`${CHINGU_BASE_ENDPOINT}/google`, { token });
    //   // Handle the response...
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const signInWithGoogle = async () => {
    // try {
    //   const { idToken } = await GoogleSignin.signIn();
    //   const googleCredential = firebase.auth.GoogleAuthProvider.credential(idToken);
    //   return firebase.auth().signInWithCredential(googleCredential);
    // } catch (error) {
    //   console.error(error);
    // }
  };
  const handleKakaoLogin = async () => {
    // try {
    //   const result = await KakaoLogins.login();
    //   const token = result.accessToken;
    //   // Send the token to your backend
    //   await axios.post(`${CHINGU_BASE_ENDPOINT}/auth/kakao`, { token });
    //   // Handle the response...
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleLogin = useCallback(async () => {
    let isValid = true;
    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validEmail) {
      setEmailError("Invalid email format");
      isValid = false;
    }

    // Validate password
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    }

    if (!isValid) return;

    try {
      const response = await axios.post(`${CHINGU_BASE_ENDPOINT}/auth/login`, {
        email: email,
        password: password,
        client: "mobileApp",
      });

      const token = response.data.data.token;
      setToken(token);
    } catch (error) {
      // Handle error (e.g., invalid credentials, server error)
      console.error(error);
    }
  }, [email, validEmail, password, setToken, CHINGU_BASE_ENDPOINT]);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      extraScrollHeight={SIZES.height * 0.2}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <Block>
        <StatusBar barStyle="light-content" />
        <ImageBackground style={styles.header} source={images.login}>
          <Block center middle color={COLORS.black}>
            <Image
              style={{ width: 77.38, height: 23.41 }}
              source={icons.logo}
            />
          </Block>
        </ImageBackground>

        <Card
          noflex
          radius={32}
          marginTop={-38}
          padding={[38, 28]}
          style={{ height: `${CONTAINER_HEIGHT}%` }}
        >
          <Text h2 bold>
            Welcome Back!
          </Text>
          <Text gray medium marginTop={10} marginBottom={28}>
            Login to continue
          </Text>

          <Block row space="between">
            <Button
              flex
              color={COLORS.facebook}
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="facebook"
                  color={COLORS.white}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              flex
              color={COLORS.black}
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="apple"
                  color={COLORS.white}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              onPress={handleGoogleLogin}
              flex
              outlined
              color={COLORS.gray}
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="google"
                  color={COLORS.black}
                  style={{ marginVertical: 20 }}
                />
              }
            />
            <Button
              onPress={handleKakaoLogin}
              flex
              color="yellow"
              style={{ marginRight: 11, height: "auto" }}
              icon={
                <Icon
                  name="kakao"
                  color={COLORS.black}
                  style={{ marginVertical: 20 }}
                />
              }
            />
          </Block>

          <Text center gray caption margin={10}>
            Or connect with your email
          </Text>

          <Block noflex marginBottom={10}>
            <Block row space="between">
              <Text caption bold marginBottom={10}>
                EMAIL
              </Text>
              {Boolean(email && !validEmail) && (
                <Text caption error marginBottom={10}>
                  Incorrect email, try again
                </Text>
              )}
            </Block>
            <Input
              value={email}
              style={[
                styles.input,
                Boolean(email && !validEmail) && {
                  borderColor: COLORS.error,
                },
              ]}
              validation={true}
              keyboardType="email-address"
              onChangeText={(e) => setEmail(e.value)}
              onValidation={(isValid) => setValidEmail(isValid)}
              pattern='^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$'
            />
            {emailError && (
              <Text caption error marginBottom={10}>
                {emailError}
              </Text>
            )}
          </Block>
          <Block noflex marginBottom={10}>
            <Text caption bold>
              PASSWORD
            </Text>
            <Input
              secureTextEntry
              value={password}
              style={styles.input}
              onChangeText={({value}) => setPassword(value)}
            />
            {passwordError && (
              <Text caption error>
                {passwordError}
              </Text>
            )}
          </Block>

          <Button onPress={() => handleLogin()}>
            <Text center bold white>
              Login
            </Text>
          </Button>
          <Button
            transparent
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text center gray>
              Forgot Password?
            </Text>
          </Button>
          <Button
            outlined
            style={styles.button}
            color={COLORS.gray}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text center bold>
              Create an account
            </Text>
          </Button>
        </Card>
      </Block>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  header: {
    flex: 0.6,
    height: "100%",
    width: "100%",
  },
  input: {
    borderColor: COLORS.gray,
    borderRadius: 4,
    borderWidth: 2,
    color: COLORS.gray,
    fontSize: 14,
    fontWeight: "500",
  },
  button:{}
});
