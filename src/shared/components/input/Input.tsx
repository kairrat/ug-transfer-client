import React from "react";
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle
} from "react-native";
import { sharedStyles, colors } from "@styles";
import { FieldError } from "react-hook-form";

interface CompProps {
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  error?: FieldError;
  type?: string;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input = ({
  value,
  placeholder,
  leftIcon,
  rightIcon,
  keyboardType = "default",
  containerStyle,
  error=null,
  onChangeText,
  onPressLeftIcon,
  onPressRightIcon,
  type="default",
  multiline = false,
  numberOfLines = 1,
  inputStyle
}: CompProps) => {
  const calculatedStyles = () => {
    return {
      paddingHorizontal: leftIcon ? 10 : 15,
      gap: leftIcon ? 7 : 0,
    };
  };

  return (
    <View style={compStyles.container}>
      <View
        style={[
          sharedStyles.row,
          compStyles.inputWrapper,
          containerStyle,
          calculatedStyles(),
          {
            borderColor: error ? colors.error : colors.stroke,
          }
        ]}
      >
        {leftIcon && (
          <TouchableOpacity
            disabled={!onPressLeftIcon}
            onPress={onPressLeftIcon}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={colors.opacity}
          selectionColor={colors.white}
          style={[compStyles.input, sharedStyles.flex, inputStyle]}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {rightIcon && (
          <TouchableOpacity
            style={compStyles.childrenContainer}
            disabled={!onPressRightIcon}
            onPress={onPressRightIcon}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const compStyles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputWrapper: {
    alignItems: "center",
    backgroundColor: colors.field,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 7,
  },
  input: {
    padding: 0,
    color: colors.white,
  },
  childrenContainer: {
    marginLeft: 8,
  },
});
