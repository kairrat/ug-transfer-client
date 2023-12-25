import React, { useContext, useEffect } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Input } from "src/shared/components/Input";
import { CheckedGreenIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { PAYMENT_METHODS } from "../model/constants";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";
import { BottomSheetContext } from "../context/BottomSheetContext";

interface IPaymentMethodProps {
    value: PaymentMethodEnum | null;
    onChange: (method: PaymentMethodEnum) => void;
}

export const PaymentMethod: React.FC<IPaymentMethodProps> = ({ value: paymentValue, onChange }) => {
    const { modalRef, setSnapPoints } = useContext(BottomSheetContext);
    useEffect(() => {
        if (Platform.OS === "ios") {
            setSnapPoints([325]);
            modalRef.current.snapToPosition(325);
        }
        else {
            setSnapPoints([295]);
            modalRef.current.snapToPosition(295);
        }
    }, []);
    return (
        <View style={styles.container}>
            <Text style={[fonts.medium, styles.title]}>Споспоб оплаты</Text>
            <View style={styles.methods_holder}>
                {
                    Object.keys(PAYMENT_METHODS).map((key: string, index) => {
                        const method: PaymentMethodEnum = key as PaymentMethodEnum;
                        const Icon = PAYMENT_METHODS[method]['Icon'];
                        return (
                        <View key={index} style={styles.method}>
                            <TouchableOpacity style={styles.method_item_holder} onPress={() => onChange(method)}>
                                <Icon width={25}/>
                                <Text style={[fonts.regular, styles.method_text]}>{PAYMENT_METHODS[method].label}</Text>
                            </TouchableOpacity>
                            {
                                paymentValue === key &&
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