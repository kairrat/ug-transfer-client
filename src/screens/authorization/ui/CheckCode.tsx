import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SmsLayout } from './SmsLayout';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { colors, fonts } from '@styles';
import { ResendCode } from './ResendCode';

interface CompProps {
  onBackPress: () => void;
  onCodeConfirm: (code: string) => void;
  onResendCodePress: () => void;
  isCodeError: boolean;
}

export const CheckCode = ({
  isCodeError,
  onCodeConfirm,
  onResendCodePress,
  onBackPress,
}: CompProps) => {
  const [codeInput, setCodeInput] = useState('');

  return (
    <SmsLayout
      buttonText="Далее"
      onButtonPress={() => onCodeConfirm(codeInput)}
      onBackPress={onBackPress}
      isDisabledButton={codeInput.length < 4}
    >
      <Text style={[compStyles.title, fonts.label]}>{'Проверочные цифры'}</Text>
      <SmoothPinCodeInput
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
        {'Введите пожалуйста 4 последние цифры номера телефона нашего автоответчика'}
      </Text>

      <View style={compStyles.errorTextContainer}>
        {isCodeError && (
          <Text style={[compStyles.errorText, fonts.description]}>{'Неправильный код'}</Text>
        )}
      </View>

      <ResendCode containerStyle={compStyles.resendCodeContainer} onResend={onResendCodePress} />
    </SmsLayout>
  );
};

const compStyles = StyleSheet.create({
  title: {
    marginBottom: 52,
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
    marginTop: 20,
    paddingHorizontal: 45,
    textAlign: 'center',
    marginBottom: 39,
  },
  errorTextContainer: {
    height: 40,
  },
  errorText: {
    color: colors.error,
  },
  resendCodeContainer: {
    marginTop: 'auto',
  },
});
