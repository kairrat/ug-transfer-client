import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors, fonts } from "../../style";
// @ts-ignore
import Cross from '@assets/img/cross.svg';

interface ScreenHeaderProps {
    leftIcon?: any;
    rightComponent?: any;
    title?: string;
    textStyle?: any;
    onLeftButtonPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({leftIcon = <Cross />, rightComponent, title, onLeftButtonPress, textStyle=null}) => {
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={onLeftButtonPress}>
                {leftIcon}
            </TouchableOpacity>
            <Text style={[styles.header_title, textStyle]}>{title}</Text>
            {
                rightComponent ? rightComponent : <View />
            }
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 15,
        marginBottom: 10
    },
    header_title: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500"
    }
});