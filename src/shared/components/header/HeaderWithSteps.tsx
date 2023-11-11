import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import ArrowLeftIcon from "@assets/img/arrowLeft.svg";
import { fonts, colors } from "@styles";

interface CompProps {
  title: string;
  containerStyle?: StyleProp<ViewStyle>;
  onPressBack: () => void;
}

export const HeaderWithSteps = ({
  title,
  containerStyle,
  onPressBack,
}: CompProps) => {
  return (
    <View
      style={[
        { flexDirection: "row", justifyContent: "space-between" },
        containerStyle,
      ]}
    >
      <TouchableOpacity onPress={onPressBack}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      {
        <>
          <Text style={[fonts.text_semiBold, { color: colors.white }]}>
            {title}
          </Text>
        </>
      }
      <View></View>
    </View>
  );
};
