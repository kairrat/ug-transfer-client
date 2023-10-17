import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { fonts, colors } from '@styles';

interface CompProps {
  onResend: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export const ResendCode = ({ onResend, containerStyle }: CompProps) => {
  const [isCodeResended, setIsCodeResended] = useState(false);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval;

    if (isCodeResended) {
      interval = setInterval(() => {
        if (timer > 0) {
          setTimer(prevTimer => prevTimer - 1);
        } else {
          clearInterval(interval);
          setIsCodeResended(false);
        }
      }, 1000);

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [isCodeResended, timer, onResend]);

  const onPressResend = () => {
    setIsCodeResended(true);
    setTimer(60);
    onResend();
  };

  return (
    <View style={[compStyles.container, containerStyle]}>
      {isCodeResended ? (
        <>
          <Text style={[compStyles.cooldownText, fonts.text]}>
            {'Вы сможете отправить код  \n  повторно через'}
          </Text>
          <Text style={[compStyles.timerText, fonts.timer]}>00:{timer} сек</Text>
        </>
      ) : (
        <>
          <Text style={[compStyles.title, fonts.description]}>{'Не было звонка?'}</Text>
          <TouchableOpacity onPress={onPressResend}>
            <Text style={[compStyles.sendCodeText, fonts.text_Bold]}>{'Перезвонить повторно'}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    gap: 5,
  },
  timerText: {
    color: colors.opacity,
    textAlign: 'center',
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  sendCodeText: {
    textDecorationLine: 'underline',
    color: colors.green,
  },
  cooldownText: {
    color: colors.white,
    textAlign: 'center',
    marginTop: 13,
  },
});
