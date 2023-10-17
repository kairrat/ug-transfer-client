import React from 'react';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { sharedStyles, colors } from '@styles';

interface CompProps {
  value: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  onChangeText: (text: string) => void;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}

export const Input = ({
  value,
  placeholder,
  leftIcon,
  rightIcon,
  keyboardType = 'default',
  containerStyle,
  onChangeText,
  onPressLeftIcon,
  onPressRightIcon,
}: CompProps) => {
  const calculatedStyles = () => {
    return {
      paddingHorizontal: leftIcon ? 10 : 15,
      gap: leftIcon ? 7 : 0,
    };
  };

  return (
    <View style={compStyles.container}>
      <View style={[sharedStyles.row, compStyles.inputWrapper, containerStyle, calculatedStyles()]}>
        {leftIcon && (
          <TouchableOpacity disabled={!onPressLeftIcon} onPress={onPressLeftIcon}>
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
          style={[compStyles.input, sharedStyles.flex]}
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
    width: '100%',
  },
  inputWrapper: {
    alignItems: 'center',
    backgroundColor: colors.field,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: colors.stroke,
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
