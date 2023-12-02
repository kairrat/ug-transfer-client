import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Close from '@assets/img/cross.svg';
import { colors, fonts } from "../../../shared/style";


export const FindOrderRouteHeader = ({onBack}) => {
    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 14,
            paddingBottom: 14,
            paddingTop: 18
        }}>
            <TouchableOpacity onPress={onBack}>
                <Close />
            </TouchableOpacity>
            <Text style={[
                fonts.text_semiBold,
                { color: colors.white }
            ]}>Подобрать маршрут</Text>
            <View />
        </View>
    )
};