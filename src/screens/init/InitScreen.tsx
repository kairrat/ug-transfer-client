import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { sharedStyles } from "@styles";
import { Distance } from "./ui/Distance";
import { StackScreens } from "src/routes/types/StackScreens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorakeKeys } from "../../app/types/authorization";
import { usersDriverInfo } from "@screens/init/init-actions";
import { RegComplete } from "@screens/init/init-response";

type CompProps = NativeStackScreenProps<StackScreens, "Init">;
const cases = {
  CompletedRegistration: "Orders",
  NotAuthorized: "AuthenticationChoice",
};
export const InitScreen: React.FC<CompProps> = function InitScreen({
  navigation,
}) {
  useEffect(() => {
    const checkAuthorization = () => {
      return AsyncStorage.getItem(AsyncStorakeKeys.TOKEN);
    };
    const navigateToScreen = async (token) => {
      if (!token) {
        return navigation.navigate("AuthenticationChoice");
      }

      const userInfo = await usersDriverInfo(token);
      if (!userInfo.subscription_status) {
        return navigation.navigate("Subscription", {
          subscription_status: userInfo.subscription_status,
        });
      }

      if (
        userInfo.subscription_status &&
        userInfo.regComplete === RegComplete.VERIFYING
      ) {
        return navigation.navigate("CreateProfileComplete");
      }

      return navigation.navigate("Orders");
    };

    checkAuthorization().then(navigateToScreen);
  }, []);

  return (
    <ImageBackground
      source={require("@assets/img/backgroundSplash.jpg")}
      style={[sharedStyles.flex, sharedStyles.center]}
    >
      <Image style={compStyles.logo} source={require("@assets/img/logo.png")} />
      <View style={compStyles.distanceContainer}>
        <Distance />
      </View>
    </ImageBackground>
  );
};

const compStyles = StyleSheet.create({
  distanceContainer: {
    position: "absolute",
    bottom: "20%",
  },
  logo: {
    width: 240,
    height: 90,
  },
});
