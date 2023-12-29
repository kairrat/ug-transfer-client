import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "src/routes/types/StackScreens";
import { SendCode } from "./ui/SendCode";
import { useEvent, useStore, useUnit } from "effector-react";
import { $authorization } from "./models/Authorization";
import {
  AsyncStorageKeys,
  AuthorizationType,
} from "../../app/types/authorization";
import { CheckCode } from "./ui/CheckCode";
import { useNavigation } from "@react-navigation/native";
import { sendCheckCode, verifyCode } from "./authorization-actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setProfileData, setSettings } from "../../features/create-profile/models/Profile";
import { Profile } from "src/types/profile";
import { ISettings, SettingOption } from "src/features/profile";

interface SmsVerificationProps
  extends NativeStackScreenProps<StackScreens, "SmsVerification"> {}

export const SmsVerification: React.FC<SmsVerificationProps> =
  function SmsVerificationScreen() {
    const navigation = useNavigation<any>();
    const { authorizationType } = useStore($authorization);
    const handleProfileData = useEvent(setProfileData);
    const [handleSetSettings] = useUnit([setSettings]);
    const [phone, setPhone] = useState("");
    const [isCodeCorrect, setIsCodeCorrect] = useState(true);
    
    const labelText = authorizationType === AuthorizationType.LOGIN ? "Вход" : "Регистрация";
    
    const changeCodeCorrect = () => {
      setIsCodeCorrect(true);
    };
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

    const handleSendCode = async (phoneNumber: string) => {
      try {
        const { success } = await sendCheckCode(phoneNumber);
        if (success) {
          setPhone(phoneNumber);
        }
      } catch (err) {
        console.error('Failed to send code', err);
      }
    };

    const handleCodeConfirm = async (code: string) => {
      try {
        const data = await verifyCode(phone, code);
        if (!data) {
          setIsCodeCorrect(false);
          return;
        }
        const {
          token,
          user_data: { subscription_status, ...user_data },
        } = data;
        await AsyncStorage.setItem(AsyncStorageKeys.TOKEN, token);
        handleProfileData({ phone, subscriptionStatus: subscription_status, ...user_data });
        if (!subscription_status) {
          navigation.navigate("Subscription", { subscription_status });
        }
        handleSettingsLoad(user_data);
        navigation.navigate("Orders");
      } catch (err) {
        console.error('Failed to verify code', err);
      }
      
    };

    const handleResendCode = () => {
      handleSendCode(phone);
    };

    const handleBackPress = () => {
      navigation.goBack();
    };

    return (
      <>
        {phone === "" ? (
          <SendCode
            titleText={`${labelText} \n по номеру телефона`}
            buttonText={labelText}
            onSendPress={handleSendCode}
            onBackPress={handleBackPress}
          />
        ) : (
          <CheckCode
            onResendCodePress={handleResendCode}
            isCodeError={!isCodeCorrect}
            onCodeConfirm={handleCodeConfirm}
            onBackPress={() => setPhone("")}
            changeIsCodeCorrect={changeCodeCorrect}
          />
        )}
      </>
    );
  };
