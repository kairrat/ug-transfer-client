import React from "react";
import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, fonts } from "src/shared/style";

interface IScreenHeaderProps {
    leftIcon?: any;
    title?: string;
    onLeftIconPress?: () => void;
    titleColor?: string;
    absolutePosition?: boolean;
    leftIconStyle?: StyleProp<ViewStyle>;
}

export const ScreenHeader: React.FC<IScreenHeaderProps> = ({ leftIcon=null, title="", onLeftIconPress = () => {}, titleColor=colors.white, absolutePosition=false, leftIconStyle }) => {
    return(
        <View style={absolutePosition ? styles.absoluteContainer : styles.container}>
            <View style={[styles.leftIcon_holder, leftIconStyle]}>
                <TouchableOpacity style={{zIndex: 1}} onPress={onLeftIconPress}>
                    {leftIcon}
                </TouchableOpacity>
            </View>
            <Text style={[fonts.medium, styles.title, { color: titleColor || colors.white }]}>{title}</Text>
            <View />
        </View>
    );
};

const styles = StyleSheet.create({
    absoluteContainer: {
        position: "absolute",
        top: 0,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    leftIcon_holder: {
        padding: 10,
        backgroundColor: colors.black,
        borderWidth: 1,
        borderRadius: 12,
        zIndex: 1,
        position: 'absolute',
        left: 10,
        top: 10
    },
    title: {
        width: '100%',
        fontSize: 16,
        textAlign: 'center'
    }
});