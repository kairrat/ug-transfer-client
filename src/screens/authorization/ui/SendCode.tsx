import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { SmsLayout } from "./SmsLayout";
import { Input } from "@components/input/Input";
import { PhoneRounded } from "@components/icons/PhoneRounded";
import { colors, fonts } from "@styles";

interface CompProps {
  buttonText: string;
  titleText: string;
  onBackPress: () => void;
  onSendPress: (number: string) => void;
}

export const SendCode = ({
  buttonText,
  titleText,
  onSendPress,
  onBackPress,
}: CompProps) => {
  const [phone, setPhone] = useState<string>();

  const phoneNumberRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  const handleButtonPress = () => {
    onSendPress(phone);
  };

  return (
    <SmsLayout
      buttonText={buttonText}
      onButtonPress={handleButtonPress}
      isDisabledButton={!phoneNumberRegex.test(phone)}
      onBackPress={onBackPress}
    >
      <Text style={[compStyles.title, fonts.label]}>{titleText}</Text>

      <Input
        leftIcon={<PhoneRounded />}
        value={phone}
        keyboardType="phone-pad"
        placeholder="Телефон"
        onChangeText={setPhone}
      />
      <Text style={[compStyles.smsText, fonts.description]}>
        {"На ваш номер телефона придет СМС с проверочным кодом"}
      </Text>
    </SmsLayout>
  );
};

const compStyles = StyleSheet.create({
  title: {
    marginBottom: 29,
    color: colors.white,
  },
  smsText: {
    color: colors.white,
    marginTop: 35,
    width: "80%",
    textAlign: "center",
  },
});
