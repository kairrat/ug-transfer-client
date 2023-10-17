import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from 'src/routes/types/StackScreens';
import { SendCode } from './ui/SendCode';
import { useStore } from 'effector-react';
import { $authorization } from './models/Authorization';
import { AuthorizationType } from '../../app/types/authorization';
import { CheckCode } from './ui/CheckCode';
import { useNavigation } from '@react-navigation/native';
import { sendCheckCode, verifyCode } from './authorization-actions';

type CompProps = NativeStackScreenProps<StackScreens, 'SmsVerification'>;

export const SmsVerification: React.FC<CompProps> = function SmsVerificationScreen() {
  const [phone, setPhone] = useState('');
  const [isCodeCorrect, setIsCodeCorrect] = useState(true);

  const navigation = useNavigation();
  const { authorizationType } = useStore($authorization);

  const labelText = authorizationType === AuthorizationType.LOGIN ? 'Вход' : 'Регистрация';

  const handleSendCode = async (phoneNumber: string) => {
    const { success } = await sendCheckCode(phoneNumber);

    if (success) {
      setPhone(phoneNumber);
    }
  };

  const handleCodeConfirm = async (code: string) => {
    const { token } = await verifyCode(phone, code);

    if (token) {
      navigation.navigate('AuthorizationComplete');
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
      {phone === '' ? (
        <SendCode
          titleText={`${labelText} по номеру телефона`}
          buttonText={labelText}
          onSendPress={handleSendCode}
          onBackPress={handleBackPress}
        />
      ) : (
        <CheckCode
          isCodeError={!isCodeCorrect}
          onCodeConfirm={handleCodeConfirm}
          onResendCodePress={handleResendCode}
          onBackPress={() => setPhone('')}
        />
      )}
    </>
  );
};
