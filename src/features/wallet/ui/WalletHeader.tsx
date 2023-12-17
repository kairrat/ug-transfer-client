import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { colors, fonts } from "../../../shared/style";
import Cross from '@assets/img/cross.svg';

export const WalletHeader = ({goBack}) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={goBack}>
                <Cross />
            </TouchableOpacity>
            <Text style={[styles.header_title, fonts.text_semiBold]}>Баланс</Text>
            <View />
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
      paddingHorizontal: 14,
      paddingVertical: 18,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    header_title: {
        color: colors.white
    },
});