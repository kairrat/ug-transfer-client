import { FC, useContext, useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { colors } from "src/shared/style";
import { BottomSheetContext } from "../context/BottomSheetContext";
import { useUnit } from "effector-react";
import { $main, setFinishedOrder, setOrderProcessStatus } from "../model/MainStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { TBottomSheetMethods } from "src/features/order/types/bottomSheetMethods";

type OrderProcessProps = TBottomSheetMethods &{
}

export const OrderProcess: FC<OrderProcessProps> = ({ setBottomSheetState }) => {
    const [
        { orderProcessStatus, order }, 
        handleSetOrderProcessStatus, 
        handleSetBottomSheetState,
        handleSetFinishedOrder
    ] = useUnit([$main, setOrderProcessStatus, setFinishedOrder]);
   
    const onReceivedDismiss = () => {
        console.log('onReceivedDismiss')
        handleSetOrderProcessStatus("received");

        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
    };

    const onSeekingDismiss = () => {
        console.log('onSeekingDismiss')
        setBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);

    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>{orderProcessStatus == "took" ? "Ваш заказ принят" : "Водитель ищется..."}</Text>
            <Button projectType="primary" onPress={orderProcessStatus === "took" ? onReceivedDismiss : onSeekingDismiss}>
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