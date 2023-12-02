import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Cross from '@assets/img/cross.svg';
import { colors, fonts } from "../../../style";

interface ScreenHeaderProps {
    leftIcon?: any;
    rightComponent?: any;
    title?: string;
    onLeftButtonPress?: () => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({leftIcon = <Cross />, rightComponent, title, onLeftButtonPress}) => {
    return(
        <View style={styles.header}>
            <TouchableOpacity onPress={onLeftButtonPress}>
                {leftIcon}
            </TouchableOpacity>
            {
                title &&
                <Text style={[styles.header_title, fonts.text_Bold]}>{title}</Text>
            }
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
        paddingVertical: 14,
        marginBottom: 10
    },
    header_title: {
        color: colors.white
    }
});