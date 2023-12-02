import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import { colors, fonts } from "../../../shared/style";
import { ConfirmFinishOrder } from "./ConfirmFinishOrder";
import { FailedAcceptOrder } from "./FailedAcceptOrder";
import { OrderFinishedNotification } from "./OrderFinishedNotification";
import { TopupBalance } from "./TopupBalance";



export const OrderConfirmPopup: React.FC<any> = ({ route }) => {
    const { type, from, to, id } = route.params;
    const navigation = useNavigation<any>();
    const text = type === "confirmFinishOrder" ? "Завершить заказ" : "Пополнить баланс";
    

    const handleMoveBack = () => {
        navigation.goBack();
    }

    const handleMoveToOrders = () => {
        navigation.goBack("Orders");
    }

    const handleMoveToTopupBalance = () => {
        navigation.navigate("Wallet");
    }

    const handleFinishOrder = () => {
        navigation.setParams( {type: "orderFinishedNotification"})
    }

    const POPUP_LIST = {
        'confirmFinishOrder': <ConfirmFinishOrder from={from} to={to} goBack={handleMoveBack} finishOrder={handleFinishOrder}/>,   
        'orderFinishedNotification': <OrderFinishedNotification goToOrders={handleMoveToOrders}/>,
        'failedAcceptOrder': <FailedAcceptOrder goToOrders={handleMoveToOrders}/>,
        'topupBalance': <TopupBalance goBack={handleMoveBack} topupBalance={handleMoveToTopupBalance}/>
    }
    return (
        <View style={{
            backgroundColor: colors.background,
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            {POPUP_LIST[type]}
        </View>
    )
}

