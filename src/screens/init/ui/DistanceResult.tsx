import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fonts, colors, sharedStyles } from '@styles';
import { hexToRGBA } from '@utils/hexToRGBA';

export const DistanceResult = () => {
  return (
    <View style={[sharedStyles.center, compStyles.container]}>
      <Text style={[fonts.title, compStyles.text]}>123123123 км</Text>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    backgroundColor: hexToRGBA(colors.black, 0.35),
    borderRadius: 12,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  text: {
    color: colors.primary,
  },
});
