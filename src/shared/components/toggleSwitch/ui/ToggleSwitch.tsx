import React from "react";
import { TouchableOpacity, StyleSheet, View, DimensionValue } from "react-native"
import { colors } from "../../../style";

type ToggleSwitchProps = {
    value: boolean,
    onChange: (value: boolean) => void,
    width?: DimensionValue
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({value, onChange, width = 60}) => {
    const handleToggle = () => {
        onChange(!value);
    }
    return (
        <TouchableOpacity 
            onPress={handleToggle}
            style={[styles.switch_holder, {
                width,
                borderColor: value ? colors.primary : colors.stroke,
                flexDirection: value ? 'row-reverse' : 'row',
            }]}
        >
            <View style={[styles.switch_thumb, {
                backgroundColor: value ? colors.primary : colors.stroke,
            }]}/>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    switch_holder: {
        borderRadius: 44,
        borderWidth: 1,
        height: 32,
        padding: 2
    },
    switch_thumb: {
        borderRadius: 60,
        height: 25,
        width: 25,
    }
});