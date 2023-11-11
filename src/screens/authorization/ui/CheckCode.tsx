import React, { useState } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import { SmsLayout } from "./SmsLayout";
import { colors, fonts } from "@styles";
import { ResendCode } from "./ResendCode";
import PinCodeInput from "@components/pincode/Pincode";
const { width, height } = Dimensions.get("window");
interface CompProps {
  onBackPress: () => void;
  onCodeConfirm: (code: string) => void;
  onResendCodePress: () => void;
  isCodeError: boolean;
  changeIsCodeCorrect: (isCodeCorrect: boolean) => void;
}

export const CheckCode = ({
  isCodeError,
  onCodeConfirm,
  onResendCodePress,
  onBackPress,
  changeIsCodeCorrect,
}: CompProps) => {
  const [codeInput, setCodeInput] = useState("");
  return (
    <SmsLayout
      buttonText="Далее"
      onButtonPress={() => onCodeConfirm(codeInput)}
      onBackPress={onBackPress}
      isDisabledButton={codeInput.length < 4}
    >
      <Text style={[compStyles.title, fonts.label]}>{"Проверочные цифры"}</Text>
      <PinCodeInput
        cellStyle={compStyles.codeChar}
        cellStyleFocused={{
          borderColor: colors.primary,
        }}
        textStyle={compStyles.codeText}
        codeLength={4}
        cellSpacing={13}
        value={codeInput}
        onTextChange={setCodeInput}
      />
      <Text style={[compStyles.enterCodeText, fonts.description]}>
        Введите 4-х значный код
      </Text>
      <View style={compStyles.errorTextContainer}>
        {isCodeError && (
          <Text style={[compStyles.errorText, fonts.description]}>
            Неверный код
          </Text>
        )}
      </View>
      <ResendCode
        setCodeInput={setCodeInput}
        containerStyle={compStyles.resendCodeContainer}
        onResend={onResendCodePress}
        changeIsCodeCorrect={changeIsCodeCorrect}
      />
    </SmsLayout>
  );
};
console.log("height", height);
const compStyles = StyleSheet.create({
  title: {
    marginBottom: "5%",
    color: colors.white,
  },
  codeChar: {
    borderBottomWidth: 2,
    borderColor: colors.white,
  },
  codeText: {
    color: colors.white,
    fontSize: 30,
  },
  enterCodeText: {
    color: colors.white,
    marginTop: "5%",
    paddingHorizontal: 45,
    textAlign: "center",
    marginBottom: "10%",
  },
  errorTextContainer: {
    height: "10%",
  },
  errorText: {
    color: colors.error,
  },
  resendCodeContainer: {},
});
