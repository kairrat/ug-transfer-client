import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, Image, View } from 'react-native';
import { sharedStyles } from '@styles';
import { Distance } from './ui/Distance';
import { StackScreens } from 'src/routes/types/StackScreens';
import { useNavigation } from '@react-navigation/native';

type CompProps = NativeStackScreenProps<StackScreens, 'Init'>;

export const InitScreen: React.FC<CompProps> = function InitScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('AuthenticationChoice');
    }, 2000);
  }, []);

  return (
    <ImageBackground
      source={require('@assets/img/backgroundSplash.jpg')}
      style={[sharedStyles.flex, sharedStyles.center]}
    >
      <Image style={compStyles.logo} source={require('@assets/img/logo.png')} />
      <View style={compStyles.distanceContainer}>
        <Distance />
      </View>
    </ImageBackground>
  );
};

const compStyles = StyleSheet.create({
  distanceContainer: {
    position: 'absolute',
    bottom: '20%',
  },
  logo: {
    width: 240,
    height: 90,
  },
});
