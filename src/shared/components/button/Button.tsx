import React from "react";
import { Ref } from "react-hook-form";
import { DimensionValue, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../style";

type ButtonProps = {
    onPress: () => void;
    projectType?: string;
    children?: any;
    width?: DimensionValue,
    disabled?: boolean;
}

export const Button = React.forwardRef<Ref, ButtonProps>(({children, onPress, projectType="default", width='100%', disabled=false}, ref) => {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={[styles[projectType], { width, opacity: disabled ? .7 : 1 }]}
            disabled={disabled}
        >
            {children}
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    default: {
        borderColor: colors.stroke,
        backgroundColor: colors.field,
        borderWidth: 1,
        borderRadius: 7,
        padding: 10,
        marginVertical: 5
    },
    primary: {
        backgroundColor: colors.primary,
        borderWidth: 1,
        borderColor: colors.green,
        color: colors.white,
        borderRadius: 7,
        padding: 12,
        marginVertical: 10
    },
    green_primary: {
        backgroundColor: colors.green,
        borderWidth: 1,
        borderColor: colors.green,
        color: colors.white,
        borderRadius: 7,
        padding: 12,
        marginVertical: 10
    },
    secondary: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.white,
        color: colors.white,
        borderRadius: 7,
        padding: 12,
        marginVertical: 10
    },
    close: {
        borderWidth: 0,
        backgroundColor: 'transparent'
    },
    application_reject: {
        backgroundColor: 'none',
        borderWidth: 1,
        borderColor: 'transparent',
        color: colors.white,
        borderRadius: 7,
        padding: 12,
        marginVertical: 10
    },
    application_accept: {
        width: '100%',
        backgroundColor: colors.green,
        borderWidth: 1,
        borderColor: colors.green,
        color: colors.white,
        borderRadius: 7,
        padding: 12,
        marginVertical: 10
    },
    block_driver: {
        backgroundColor: 'transparent',
        color: colors.error,
        borderRadius: 7,
        marginVertical: 10
    }
})