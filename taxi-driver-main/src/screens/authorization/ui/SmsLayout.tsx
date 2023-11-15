import { FullScreenLayout } from "@components/FullScreenLayout";
import { PrimaryButton } from "@components/button/PrimaryButton";
import React, { ReactNode, useMemo } from "react";
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { sharedStyles, colors } from "@styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import ArrowLeftIcon from "@assets/img/arrowLeft.svg";
import { scale } from "../../../helpers/scale";
import { ResendCode } from "@screens/authorization/ui/ResendCode";

interface CompProps {
  children: ReactNode;
  buttonText: string;
  isBackButton?: boolean;
  isDisabledButton?: boolean;
  onButtonPress: () => void;
  onBackPress?: () => void;
}

export const SmsLayout = ({
  children,
  buttonText,
  isBackButton = true,
  isDisabledButton = false,
  onButtonPress,
  onBackPress,
}: CompProps) => {
  const calculatedPaddingTop = useMemo(
    () =>
      Platform.OS === "android"
        ? isBackButton
          ? 50
          : 82
        : isBackButton
        ? 100
        : 165,
    [isBackButton]
  );

  return (
    <FullScreenLayout conainerStyle={{ backgroundColor: colors.background }}>
      {isBackButton && (
        <TouchableOpacity style={compStyles.backIcon} onPress={onBackPress}>
          <ArrowLeftIcon />
        </TouchableOpacity>
      )}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            compStyles.container,
            sharedStyles.flex,
            { paddingTop: calculatedPaddingTop },
          ]}
        >
          <Image
            style={compStyles.logo}
            source={require("@assets/img/logo.png")}
          />
          {children}
          <PrimaryButton
            text={buttonText}
            disabled={isDisabledButton}
            containerStyle={compStyles.button}
            onPress={onButtonPress}
          />
        </View>
      </TouchableWithoutFeedback>
    </FullScreenLayout>
  );
};

const compStyles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  backIcon: {
    marginTop: Platform.OS === "ios" ? 65 : 20,
  },
  logo: {
    width: scale(150),
    height: scale(50),
    marginBottom: "auto",
  },
  button: {
    marginTop: "auto",
    marginBottom: 40,
  },
});
