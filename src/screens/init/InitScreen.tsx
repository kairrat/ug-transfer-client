import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import { sharedStyles } from "@styles";
import { Distance } from "./ui/Distance";
import { StackScreens } from "src/routes/types/StackScreens";
import { AsyncStorageKeys } from "../../app/types/authorization";
import { usersDriverInfo } from "@screens/init/init-actions";
import { RegComplete } from "@screens/init/init-response";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUnit } from "effector-react";
import { $profile, setProfileData } from "src/features/create-profile";
import { ISettings, SettingOption } from "src/features/profile";
import { Profile } from "src/types/profile";
import { setSettings } from "src/features/create-profile/models/Profile";

type CompProps = NativeStackScreenProps<StackScreens, "Init">;

export const InitScreen: React.FC<CompProps> = function InitScreen({
  navigation,
}) {
  const [{}, handleSetProfile, handleSetSettings] = useUnit([$profile, setProfileData, setSettings]);
  
  const handleSettingsLoad = async (userInfo: Profile) => {
    const settings = await AsyncStorage.getItem(AsyncStorageKeys.SETTINGS);
    if (settings) {
      handleSetSettings(JSON.parse(settings));
    }
    else {
        const newSettings: ISettings = {
            [SettingOption.notification]: userInfo.urgentOrderSubscriber,
            [SettingOption.popupWindows]: userInfo.urgentOrderSubscriber,
            [SettingOption.soundSignal]: true
        };
        handleSetSettings(newSettings);
        await AsyncStorage.setItem(AsyncStorageKeys.SETTINGS, JSON.stringify(newSettings));
    }
  }

  const handleAuthorizationChange = async () => {
    const token = await AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
    if (!token) {
      return navigation.navigate("AuthenticationChoice");
    }
    console.log('Token: ', token);
    try {
      const userInfo = await usersDriverInfo(token);
      if (!userInfo) {
        return navigation.navigate("AuthenticationChoice");
      }
      handleSetProfile(userInfo);
      await handleSettingsLoad(userInfo);
      // if (!userInfo.subscription_status) {
      //   return navigation.navigate("Subscription", {
      //     subscription_status: userInfo.subscription_status,
      //   });
      // }
      if (
        userInfo.subscription_status &&
        userInfo.regComplete === RegComplete.VERIFYING
      ) {
        return navigation.navigate("CreateProfileComplete");
      }
    } catch (err) {
      console.error('Failed to get user info', err);
    }
    return navigation.navigate("Orders");
  }
  useEffect(() => {
    handleAuthorizationChange();
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
