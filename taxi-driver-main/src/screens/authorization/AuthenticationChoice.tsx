import { PrimaryButton } from "@components/button/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { setAuthorizationType } from "./models/Authorization";
import { sharedStyles, fonts, colors } from "@styles";
import { useEvent } from "effector-react";
import React, { useEffect } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StackScreens } from "src/routes/types/StackScreens";
import { AuthorizationType } from "../../app/types/authorization";
import { fontScale, scale } from "../../helpers/scale";
import { useIsFocused } from "@react-navigation/native";
const { height } = Dimensions.get("window");
type CompProps = NativeStackScreenProps<StackScreens, "AuthenticationChoice">;

export const AuthenticationChoice: React.FC<CompProps> =
  function AuthenticationChoiceScreen({ navigation }) {
    const handleAuthorizationType = useEvent(setAuthorizationType);
    const handleButtonClick = (type: AuthorizationType) => {
      handleAuthorizationType(type);
      navigation.navigate("PrivacyPolicy");
    };
    const isFocused = useIsFocused();

    useEffect(() => {
      const backAction = () => {
        if (!isFocused) {
          return false;
        }
        Alert.alert("Подождите!", "Вы уверены, что хотите выйти?", [
          {
            text: "Закрыть",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "Да",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => {
        backHandler.remove();
      };
    }, [isFocused]);
    return (
      <>
        <ImageBackground
          source={require("@assets/img/backgroundSplash.jpg")}
          style={[sharedStyles.flex, sharedStyles.center]}
        >
          <View style={compStyles.logoContainer}>
            <Image
              style={compStyles.logo}
              source={require("@assets/img/logo.png")}
            />
          </View>
          <View style={[compStyles.container, sharedStyles.paddingHorizontal]}>
            <Text style={[compStyles.text]}>
              {"Поможем найти тех, кто нужен \n Вам и отвезет Вас куда угодно"}
            </Text>
            <PrimaryButton
              text="Авторизация"
              backgroundColorStyle="rgba(48, 48, 48, 0.4)"
              containerStyle={compStyles.authorisationButton}
              textColor={colors.white}
              paddingVertical={Math.floor(height * 0.01)}
              onPress={() => handleButtonClick(AuthorizationType.LOGIN)}
            />
            <PrimaryButton
              text="Зарегистрироваться"
              paddingVertical={Math.floor(height * 0.01)}
              onPress={() => handleButtonClick(AuthorizationType.REGISTER)}
            />
          </View>
        </ImageBackground>
      </>
    );
  };

const compStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    position: "absolute",
    bottom: Math.floor(height * 0.03),
  },
  logoContainer: {
    position: "absolute",
    left: "50%",
    top: "45%",
    transform: [
      { translateX: -(scale(200) / 2) },
      { translateY: -(scale(80) / 2) },
    ],
  },
  text: {
    fontSize: fontScale(12),
    color: colors.white,
    marginBottom: 18,
    textAlign: "center",
    justifyContent: "center",
  },
  authorisationButton: {
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 9,
  },
  logo: {
    width: scale(200),
    height: scale(80),
  },
});
