import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { colors, fonts } from "../../../shared/style";
import ArrowLeft from '@assets/img/arrowLeft.svg';
import { useNavigation } from "@react-navigation/core";
import { RemindContent } from "./RemindContent";
import { Button, ScreenHeader } from "../../../shared/components";

type SubscribeRemindProps = NativeStackScreenProps<StackScreens, "SubscribeRemind">;

export const SubscribeRemind: React.FC<SubscribeRemindProps> = () => {
    const navigation = useNavigation<any>();
    const handleMoveBack = () => {
        navigation.goBack();
    }
    return(
        <View style={styles.layout}>
            <ScreenHeader leftIcon={<ArrowLeft />} onLeftButtonPress={handleMoveBack}/>
            <RemindContent />
            <View style={styles.buttons_holder}>
                <Button projectType="secondary" onPress={handleMoveBack}>
                    <Text style={[styles.secondary_button_text, fonts.label]}>Назад</Text>
                </Button>
                <Button projectType="green_primary" onPress={() => {}}>
                    <Text style={[styles.primary_button_text, fonts.label]}>Срочные заказы</Text>
                </Button>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    buttons_holder: {
        paddingHorizontal: 20,
        marginVertical: 30
    },
    secondary_button_text: {
        color: colors.white,
        textAlign: 'center'
    },
    primary_button_text: {
        color: colors.black,
        textAlign: 'center'
    }
});