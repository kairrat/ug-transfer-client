import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, SafeAreaView, StyleSheet, Text, Image } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { Button } from "../../../shared/components";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { ScreenHeader } from "../../../shared/components/screenHeader";
import { colors, fonts } from "../../../shared/style";
import ArrowLeft from '@assets/img/arrowLeft.svg';
import Logo from '@assets/img/LightLogo.png';

type CompProps = NativeStackScreenProps<StackScreens, "ConfirmDeleteAccount">;

export const ConfirmDeleteAccount: React.FC<CompProps> = () => {
    const navigation = useNavigation<any>();
    const handleMoveBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={styles.layout}>
            <ScreenHeader leftIcon={<ArrowLeft />} onLeftButtonPress={handleMoveBack}/>
            <View style={styles.holder}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo_img}
                        source={Logo} 
                        alt="logo"/> 
                </View>
                <View style={{width: '85%'}}>
                    <Text style={[styles.title, { marginBottom: 40 }]}>
                        Вы действительно хотите удалить аккаунт?
                    </Text>
                    <Text style={[styles.red_title]}>
                        Все ваши данные, поездки и т.д. будут стерты
                    </Text>
                </View>
            </View>
            <View style={styles.buttons_holder}>
                <Button projectType="secondary" onPress={() => {}}>
                    <Text style={[styles.secondary_button_text]}>Удалить</Text>
                </Button>
                <PrimaryButton onPress={handleMoveBack} text="Назад"/>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    holder: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        maxWidth: '60%',
        marginVertical: 20
    },
    logo_img: {
        maxWidth: '100%', 
        objectFit: 'contain'
    },
    title: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 18
    },
    red_title: {
        color: colors.error,
        textAlign: 'center',
        fontSize: 18
    },
    buttons_holder: {
        paddingHorizontal: 20,
        marginVertical: 30
    },
    secondary_button_text: {
        color: colors.error,
        textAlign: 'center'
    },
    primary_button_text: {
        color: colors.black,
        textAlign: 'center'
    }
});