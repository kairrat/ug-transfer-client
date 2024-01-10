import { FC, useContext, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { colors } from "src/shared/style";
import { BottomSheetContext } from "../context/BottomSheetContext";
import { useUnit } from "effector-react";
import { $main, setFinishedOrder, setOrderProcessStatus } from "../model/MainStore";
import { setBottomSheetState } from "../model/BottomSheetStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

type OrderProcessProps = {
}

export const OrderProcess: FC<OrderProcessProps> = ({ }) => {
    const [
        { orderProcessStatus, order }, 
        handleSetOrderProcessStatus, 
        handleSetBottomSheetState,
        handleSetFinishedOrder
    ] = useUnit([$main, setOrderProcessStatus, setBottomSheetState, setFinishedOrder]);
    // if (orderProcessStatus === null) {
    //     handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    // }
    const onReceivedDismiss = () => {
        handleSetFinishedOrder(order); // Mock order data
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    };

    const onSeekingDismiss = () => {
        handleSetOrderProcessStatus("received");
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{orderProcessStatus == "received" ? "Ваш заказ принят" : "Водитель ищется..."}</Text>
            <Button projectType="primary" onPress={orderProcessStatus === "received" ? onReceivedDismiss : onSeekingDismiss}>
                <Text style={styles.button_text}>OK</Text>
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