import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackScreens } from '../../routes/types/StackScreens';
import { SmsLayout } from './ui/SmsLayout';
import { StyleSheet, Text } from 'react-native';
import { fonts, colors } from '@styles';
import { useNavigation } from '@react-navigation/native';

type CompProps = NativeStackScreenProps<StackScreens, 'AuthorizationComplete'>;

export const AuthorizationComplete: React.FC<CompProps> = function AuthorizationCompleteScreen() {
  const navigation = useNavigation();

  const handleButtonPress = () => {};

  return (
    <SmsLayout buttonText={'Далее'} onButtonPress={handleButtonPress} isBackButton={false}>
      <Text style={[fonts.label, compStyles.text]}>
        {'Вы прошли верификацию по номеру телефона.Выберите роль'}
      </Text>
    </SmsLayout>
  );
};

const compStyles = StyleSheet.create({
  text: {
    color: colors.white,
    width: '80%',
    textAlign: 'center',
  },
});
