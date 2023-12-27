import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../shared/style";

type FooterProps = {
    onDeleteAccount: () => void;
    onLogout: () => void;
    onPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({onLogout, onDeleteAccount, onPrivacyPolicy}) => {
    const [deleteAccountFocus, setDeleteAccountFocus] = useState<boolean>(false);
    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={onLogout}>
                <Text style={[styles.text]}>Выйти</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onDeleteAccount}
                onPressIn={() => setDeleteAccountFocus(true)} 
                onPressOut={() => setDeleteAccountFocus(false)} 
                activeOpacity={.9}
            >
                <Text style={[styles.text, {color: deleteAccountFocus ? colors.error : colors.white}]}>Удалить аккаунт</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPrivacyPolicy}>
                <Text style={styles.text}>Политика конфедициальности</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 20,
        rowGap: 5
    },
    text: {
        fontSize: 14,
        color: colors.white
    }
});