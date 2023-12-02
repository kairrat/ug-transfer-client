import { Image, StyleSheet, Text, View } from "react-native"
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton"
import { colors, fonts } from "../../../shared/style";
import { Button } from "../../../shared/components";
import Logo from '@assets/img/logo.png';

export const TopupBalance = ({topupBalance, goBack}) => {
    return (
        <>
            <View />
            <View style={{alignItems: 'center', rowGap: 20}}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo_img}
                        source={Logo} 
                        alt="logo"/>        
                </View>
                <Text style={[fonts.text_semiBold, styles.title]}>
                    Чтобы принять заказ пополните баланс для комимисии миниму на
                </Text>
                <Text style={[fonts.title, {color: colors.primary}]}>1500 р</Text>
            </View>
            <View style={styles.buttons_container}>
                <Button projectType="secondary" onPress={goBack}>
                    <Text style={[{color: colors.white, textAlign: 'center'}, fonts.text_Bold]}>
                        Назад
                    </Text>
                </Button>
                <PrimaryButton text="Пополнить баланс" onPress={topupBalance}/>
            </View>
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        maxWidth: '60%',
    },
    logo_img: {
        maxWidth: '100%', 
        objectFit: 'contain'
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
    buttons_container: {
        width: '100%', 
        marginVertical: 20,
        padding: 20
    }
})