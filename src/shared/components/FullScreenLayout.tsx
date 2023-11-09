import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { sharedStyles } from "../style/styles";

interface CompProps {
  children: ReactNode;
  conainerStyle?: StyleProp<ViewStyle>;
}

export const FullScreenLayout: React.FC<CompProps> =
  function FullscreenLayoutView(props) {
    return (
      <View
        style={[
          sharedStyles.flex,
          props.conainerStyle,
          sharedStyles.paddingHorizontal,
        ]}
      >
        {props.children}
      </View>
    );
  };
