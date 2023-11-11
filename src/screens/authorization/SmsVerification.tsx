import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "src/routes/types/StackScreens";
import { SendCode } from "./ui/SendCode";
import { useEvent, useStore } from "effector-react";
import { $authorization } from "./models/Authorization";
import {
  AsyncStorakeKeys,
  AuthorizationType,
} from "../../app/types/authorization";
import { CheckCode } from "./ui/CheckCode";
import { useNavigation } from "@react-navigation/native";
import { sendCheckCode, verifyCode } from "./authorization-actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setProfileData } from "../profile/models/Profile";

interface SmsVerificationProps
  extends NativeStackScreenProps<StackScreens, "SmsVerification"> {}

export const SmsVerification: React.FC<SmsVerificationProps> =
  function SmsVerificationScreen() {
    const [phone, setPhone] = useState("");
    const [isCodeCorrect, setIsCodeCorrect] = useState(true);
    const navigation = useNavigation();
    const { authorizationType } = useStore($authorization);
    const handleProfileData = useEvent(setProfileData);
    const changeCodeCorrect = () => {
      setIsCodeCorrect(true);
    };
    const labelText =
      authorizationType === AuthorizationType.LOGIN ? "Вход" : "Регистрация";

    const handleSendCode = async (phoneNumber: string) => {
      const { success } = await sendCheckCode(phoneNumber);

      if (success) {
        setPhone(phoneNumber);
      }
    };

    const handleCodeConfirm = async (code: string) => {
      console.log("handleCodeConfirm");
      const data = await verifyCode(phone, code);
      if (!data) {
        setIsCodeCorrect(false);
        return;
      }
      const {
        token,
        user_data: { subscription_status },
      } = data;
      await AsyncStorage.setItem(AsyncStorakeKeys.TOKEN, token);
      handleProfileData({ phone, subscriptionStatus: subscription_status });
      if (!subscription_status) {
        navigation.navigate("Orders");
      }
    };

    const handleResendCode = () => {
      handleSendCode(phone);
    };

    const handleBackPress = () => {
      navigation.navigate("PrivacyPolicy");
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
