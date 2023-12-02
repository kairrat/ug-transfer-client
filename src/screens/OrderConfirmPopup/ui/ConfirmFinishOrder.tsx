import { Image, StyleSheet, Text, View } from "react-native";
import { Button } from "../../../shared/components";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { colors, fonts } from "../../../shared/style";
import Logo from '@assets/img/logo.png'
import ArrowVertical from '@assets/img/shortVerticalArrow.svg';
import Cross from '@assets/img/cross.svg';



export const ConfirmFinishOrder = ({from, to, goBack, finishOrder}) => {
    return (
        <>
            <View style={styles.header}>
                <Button projectType="close" onPress={goBack}>
                    <Cross />
                </Button>
            </View>
            <View style={{width: '100%', alignItems: 'center', padding: 20}}>
                <View style={styles.container}>
                    <Image
                        style={styles.logo_img}
                        source={Logo} 
                        alt="logo"/>
                        <Text style={[fonts.text_semiBold, styles.title]}>
                            Завершить заказ?
                        </Text>
                    
                </View>
                <View style={styles.cities_container}>
                    <Text style={[styles.city_title, fonts.description]}>{from}</Text>
                    <ArrowVertical />
                    <Text style={[styles.city_title, fonts.description]}>{to}</Text>
                </View>
            </View>
            <View style={styles.buttons_container}>
                <Button projectType="secondary" onPress={goBack}>
                    <Text style={[{color: colors.white, textAlign: 'center'}, fonts.text_Bold]}>
                        Назад
                    </Text>
                </Button>
                <PrimaryButton 
                    text="Завершить заказ" 
                    onPress={finishOrder}/>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: '25%'
    },
    container: {
        maxWidth: '60%'
    },
    logo_img: {
        maxWidth: '100%', 
        objectFit: 'contain'
    },
    title: {
        color: colors.white,
        textAlign: 'center'
    },
    cities_container: {
        width: '100%',
        alignItems: 'center',
        borderWidth:1,
        borderColor: colors.primary,
        borderRadius: 7,
        backgroundColor: colors.gray,
        marginVertical: 40,
        paddingVertical: 5
    },
    city_title: {
        color: colors.white,
        marginVertical: 10
    },
    buttons_container: {
        width: '100%', 
        marginVertical: 20,
        padding: 20
    }
})