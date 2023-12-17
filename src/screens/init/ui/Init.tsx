import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { View } from "react-native";
import { AsyncStorakeKeys } from "src/app/types/authorization";
import { StackScreens } from "src/routes";
import { colors } from "src/shared/style";

type InitProps = NativeStackScreenProps<StackScreens, "Init">

export const Init: React.FC<InitProps> = ({ navigation }) => {
    const handleCheckAuth = async () => {
        // const token = await AsyncStorage.getItem(AsyncStorakeKeys.TOKEN);
        // if (!token) {
        //     return navigation.navigate("Auth");
        // }
        return navigation.navigate("Main");
    }
    useEffect(() => {
        handleCheckAuth();
    }, []);
    return(
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            
        </View>
    );
};