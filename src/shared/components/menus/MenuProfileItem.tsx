import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, sharedStyles } from '@styles';
import CrownIcon from '@assets/img/crown.svg';

interface CompProps {
  title: string;
  icon: any;
}

export const MenuProfileItem = ({ title, icon }: CompProps) => {
  const Icon = icon;
  return (
    <View style={compStyles.container}>
      <View style={sharedStyles.center}>
        <CrownIcon />
        <Icon />
      </View>

      <Text style={[fonts.name, compStyles.text]}>{title}</Text>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    paddingStart: 25,
    paddingBottom: 14,
    gap: 12,
  },
  text: {
    color: colors.white,
    position: 'relative',
    top: 10,
  },
});
