import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, fonts } from '@styles';
import { MenuItemProps } from './types';

interface CompProps extends MenuItemProps {
  onPress: (route: string) => void;
}

export const MenuItem = ({
  icon,
  title,
  hasUpdates,
  backgroundColor,
  textColor,
  route,
  onPress,
}: CompProps) => {
  const Icon = icon;
  return (
    <TouchableOpacity
      style={[
        compStyles.container,
        {
          backgroundColor: backgroundColor ?? 'none',
          borderBottomColor: backgroundColor ?? colors.line,
        },
      ]}
      onPress={() => onPress(route)}
    >
      <Icon />
      <Text style={[fonts.text_semiBold, { color: textColor ?? 'white' }]}>{title}</Text>
      {hasUpdates && <View style={compStyles.updatesRound} />}
    </TouchableOpacity>
  );
};

const compStyles = StyleSheet.create({
  container: {
    paddingStart: 15,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomWidth: 1,
  },
  updatesRound: {
    width: 9,
    height: 9,
    borderRadius: 50,
    marginRight: 19,
    position: 'relative',
    top: 20,
    marginLeft: 'auto',
    backgroundColor: colors.primary,
  },
});
