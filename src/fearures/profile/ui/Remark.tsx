import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors, fonts } from "../../../shared/style";

type RemarkProps = {}

export const Remark: React.FC<RemarkProps> = () => {
    return (
        <View style={styles.remark_holder}>
            <Text style={[{color: colors.white}, fonts.info]}>
                    Уведомления и всплывающие окна у водителей и водителей-диспетчеров работают только при активном {' '}
                    <Text style={[{color: colors.green, textDecorationLine: 'underline'}, fonts.info]}>"Срочном заказе"</Text>
            </Text>
        </View>
    )
};  

const styles = StyleSheet.create({
    remark_holder: {
        paddingHorizontal: 20,
        marginVertical: 10
    }
})