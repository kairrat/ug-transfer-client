import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CheckedGreenIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { PAYMENT_METHODS } from "../model/constants";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import { $main, setOrder } from "../model/MainStore";
import { setBottomSheetState } from "../model/BottomSheetStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";

interface IPaymentMethodProps {};

export const PaymentMethod: React.FC<IPaymentMethodProps> = () => {
    const { snapToIndex } = useBottomSheet();
    const [{order}, handleSetOrder] = useUnit([$main, setOrder]);
    const handleSetBottomSheetstate = useUnit(setBottomSheetState);

    const handleSelectMethod = (method: PaymentMethodEnum) => {
        handleSetOrder({...order, paymentMethod: method});
        handleSetBottomSheetstate(BottomSheetStateEnum.SET_ADDRESS);
    }

    useEffect(() => {
        snapToIndex(0);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[fonts.medium, styles.title]}>Споспоб оплаты</Text>
            <View style={styles.methods_holder}>
                {
                    Object.keys(PAYMENT_METHODS).map((key: string, index) => {
                        const method: PaymentMethodEnum = key as PaymentMethodEnum;
                        const icon = PAYMENT_METHODS[method].Icon;
                        return (
                        <View key={index} style={styles.method}>
                            <TouchableOpacity style={styles.method_item_holder} onPress={() => handleSelectMethod(method)}>
                                {icon}
                                <Text style={[fonts.regular, styles.method_text]}>{PAYMENT_METHODS[method].label}</Text>
                            </TouchableOpacity>
                            {
                                order.paymentMethod === key &&
                                <CheckedGreenIcon height={20}/>
                            }
                        </View>
                    )})
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 10
    },
    title: {
        fontSize: 16,
        color: colors.white
    },
    methods_holder: {
        marginVertical: 20,
        flexDirection: 'column',
        rowGap: 20
    },
    method: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    method_item_holder: {
        flexDirection: 'row',
        columnGap: 10,
        flexGrow: 1
    },
    method_text: {
        color: colors.white
    }
});