import React from "react";
import { Ref } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../style";

type ButtonProps = {
    onPress: () => void;
    projectType?: string;
    children?: any;
}

export const Button = React.forwardRef<Ref, ButtonProps>(({children, onPress, projectType="default"}, ref) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles[projectType]} >
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
    }
})