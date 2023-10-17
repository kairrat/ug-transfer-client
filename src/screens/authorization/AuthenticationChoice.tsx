import { PrimaryButton } from '@components/button/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { setAuthorizationType } from './models/Authorization';
import { sharedStyles, fonts, colors } from '@styles';
import { useEvent } from 'effector-react';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { StackScreens } from 'src/routes/types/StackScreens';
import { AuthorizationType } from '../../app/types/authorization';

type CompProps = NativeStackScreenProps<StackScreens, 'AuthenticationChoice'>;

export const AuthenticationChoice: React.FC<CompProps> = function AuthenticationChoiceScreen() {
  const navigation = useNavigation();
  const handleAuthoriztionType = useEvent(setAuthorizationType);

  const handleButtonClick = (type: AuthorizationType) => {
    handleAuthoriztionType(type);

    navigation.navigate('PrivacyPolicy');
  };
  return (
    <>
      <ImageBackground
        source={require('@assets/img/backgroundSplash.jpg')}
        style={[sharedStyles.flex, sharedStyles.center]}
      >
        <Image style={compStyles.logo} source={require('@assets/img/logo.png')} />
        <View style={[compStyles.container, sharedStyles.paddingHorizontal]}>
          <Text style={[fonts.text_semiBold, compStyles.text]}>
            {'Поможем найти тех, кто нужен Вам и отвезет Вас куда угодно'}
          </Text>
          <PrimaryButton
            text="Авторизация"
            backgroundColorStyle="rgba(48, 48, 48, 0.4)"
            containerStyle={compStyles.authorisationButton}
            textColor={colors.white}
            onPress={() => handleButtonClick(AuthorizationType.LOGIN)}
          />
          <PrimaryButton
            text="Зарегистрироваться"
            onPress={() => handleButtonClick(AuthorizationType.REGISTER)}
          />
        </View>
      </ImageBackground>
    </>
  );
};

const compStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '100%',
    position: 'absolute',
    bottom: 50,
  },
  text: {
    color: colors.white,
    marginBottom: 18,
    textAlign: 'center',
    paddingHorizontal: 35,
  },
  authorisationButton: {
    borderWidth: 1,
    borderColor: colors.white,
    marginBottom: 9,
  },
  logo: {
    width: 240,
    height: 90,
  },
});
