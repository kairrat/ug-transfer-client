import { Image, StyleSheet, Text, View } from "react-native";
import Logo from '@assets/img/LightLogo.png';
import { colors, fonts } from "../../../shared/style";

export const RemindContent = () => {
    return (
        <View style={styles.holder}>
            <View style={styles.container}>
                <Image
                    style={styles.logo_img}
                    source={Logo} 
                    alt="logo"/> 
            </View>
            <View style={{width: '85%'}}>
                <Text style={[styles.title]}>
                    Чтобы включить уведомления и всплывающие окна, оформите пожалуйста подписку {' '}
                </Text>
                <Text numberOfLines={1} style={[{ color: colors.green, fontSize: 18, textAlign: 'center' }]}>"Срочные заказы"</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
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
    }
});