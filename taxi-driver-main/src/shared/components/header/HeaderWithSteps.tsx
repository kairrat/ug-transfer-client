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
import { isVisible } from "react-native-bootsplash";

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
        {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        },
        containerStyle,
      ]}
    >
      <View style={{ flexBasis: "30%", paddingStart: "5%" }}>
        {step !== 1 && (
          <TouchableOpacity onPress={onPressBack}>
            <ArrowLeftIcon />
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexBasis: "40%", alignItems: "center" }}>
        <Text
          style={[
            fonts.text_semiBold,
            {
              color: colors.white,
            },
          ]}
        >
          {title}
        </Text>
      </View>

      <View
        style={{ flexBasis: "30%", alignItems: "flex-end", paddingEnd: "3%" }}
      >
        <Text
          style={[
            fonts.label,
            {
              color: colors.primary,
            },
          ]}
        >
          Шаг {step} из {limit}
        </Text>
      </View>
    </View>
  );
};
