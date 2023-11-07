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
  step: number;
  limit: number;
  containerStyle?: StyleProp<ViewStyle>;
  onPressBack: () => void;
}

export const HeaderWithSteps = ({
  title,
  step,
  limit,
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

      {step > 0 && (
        <>
          <Text
            style={[
              fonts.text_semiBold,
              { color: colors.white, marginLeft: 30 },
            ]}
          >
            {title}
          </Text>
          <Text style={[fonts.text_semiBold, { color: colors.primary }]}>
            Шаг {step} из {limit}
          </Text>
        </>
      )}
    </View>
  );
};
