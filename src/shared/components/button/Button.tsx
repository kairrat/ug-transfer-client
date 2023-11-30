import React from "react";
import { Ref } from "react-hook-form";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../style";

export const Button = React.forwardRef<Ref, any>(({children, onPress, projectType="default"}, ref) => {
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
    }
})