import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { colors } from "src/shared/style";

type OrderProcessProps = {
    status: 'received' | 'seeking' | null;
    onReceivedDismiss: () => void;
    onSeekingDismiss: () => void;
}

export const OrderProcess: FC<OrderProcessProps> = ({ status, onReceivedDismiss, onSeekingDismiss }) => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>{status == "received" ? "Ваш заказ принят" : "Водитель ищется..."}</Text>
            <Button projectType="primary" onPress={status === "received" ? onReceivedDismiss : onSeekingDismiss}>
                <Text style={styles.button_text}>ОК</Text>
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20
    },
    title: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginVertical: 40
    },
    button_text: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.black,
        textAlign: 'center'
    }
});