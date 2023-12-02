import { StyleSheet, Text, View } from "react-native"
import { colors, fonts } from "../../../shared/style";
import Wallet from '@assets/img/wallet.svg';

export const BalanceContainer = ({amount}) => {
    return (
        <View style={styles.holder}>
            <Text style={[styles.title]}>Ваш баланс</Text>
            <View style={styles.amount_holder}>
                <View style={styles.amount_icon}>
                    <Wallet />
                </View>
                <Text style={[styles.amount,]}>{amount} р</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    holder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: colors.stroke,
        backgroundColor: colors.gray
    },
    title: {
        color: colors.primary,
        fontWeight: '400',
        fontSize: 16
    },
    amount_holder: {
        flexDirection: 'row',
        columnGap: 5
    },
    amount_icon: {
        transform: [{scale: .8}]
    },
    amount: {
        color: colors.primary,
        fontSize: 16
    }
})