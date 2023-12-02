import { StyleSheet, View } from "react-native";
import { Input } from "../../../shared/components/input/Input";

export const WithdrawInput = ({value, onChange}) => {
    return (
        <View style={styles.holder}>
            <Input 
                keyboardType="numeric"
                value={value} 
                onChangeText={onChange}
                placeholder="Введите сумму для пополнения"/>
        </View>
    )
};

const styles = StyleSheet.create({
    holder: {
        width: '100%'
    }
})