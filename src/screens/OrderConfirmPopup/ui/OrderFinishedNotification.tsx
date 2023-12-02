import { Image, StyleSheet, Text, View } from "react-native"
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton"
import { colors, fonts } from "../../../shared/style";
import Logo from '@assets/img/logo.png'

export const OrderFinishedNotification = ({goToOrders}) => {
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
                    Заказ успешно завершен!
                </Text>
            </View>
            <View style={styles.buttons_container}>
                <PrimaryButton text="ОК" onPress={goToOrders}/>
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
        width: '100%',
        color: colors.white,
        textAlign: 'center',

    },
    buttons_container: {
        width: '100%', 
        marginVertical: 20,
        padding: 20
    }
})