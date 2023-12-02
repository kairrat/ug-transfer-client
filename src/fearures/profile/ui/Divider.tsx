import React from "react";
import { View } from "react-native";
import { colors } from "../../../shared/style";

export const Divider: React.FC = () => {
    return (
        <View style={{paddingHorizontal: 20, marginVertical: 5}}>
                <View style={{
                    width: '100%',
                    borderTopWidth: 1,
                    borderTopColor: colors.opacity,}}/>
        </View>
    )
};