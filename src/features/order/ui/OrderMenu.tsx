import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useCallback, useMemo, useState } from "react";
import { colors } from "src/shared/style";
import { Button } from "src/shared/components/Button";
import { ArrowRightPrimaryIcon, ClockIcon, CrossIcon, EditOptionsIcon, LocationMarkIcon } from "src/shared/img";
import { useUnit } from "effector-react";
import { $main, setOrder } from "src/features/main/model/MainStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import SelectCarClass from "./SelectCarClass";
import { PAYMENT_METHODS } from "src/features/main/constants/constants";
import dayjs from 'dayjs';
import DatePicker from "react-native-date-picker";
import Checkbox from '@react-native-community/checkbox';
import { MainStatusEnum } from "src/features/main/enums/mainStatus.enum";

type Props = TBottomSheetMethods & {};

const OrderMenu: FC<Props> = function({setBottomSheetState}) {
    const [{order, status}, handleSetOrder] = useUnit([$main, setOrder]);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

    function openDepartureAdddress() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    function openArrivaleAdddress() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    function selectCarClass(index: number) {
        handleSetOrder({...order, carClass: index});
    }

    // Close datepicker
    function handleCloseDatepicker() {
        setIsDatePickerOpen(false);
    }

    // Confirm date picker
    function handleConformDatepicker(date: Date) {
        setIsDatePickerOpen(false);
        handleSetOrder({...order, date});
    }

    // Create order
    function handleCreateOrder() {
        
    }

    // Open modal with order additional information
    function handleOpenOrderAdditionalModal() {
        setBottomSheetState(BottomSheetStateEnum.ORDER_DETAIL);

    }

    const handleOpenPaymentSheet = () => {
        setBottomSheetState(BottomSheetStateEnum.DEFINED_PAYMENT_METHOD);
    }

    const getDepartureAddressButton = useCallback(() => {
        if (order.departure.address === "" || order.departure.city === "") {
            return "Откуда едем?";
        }
        return order.departure.city + ', ' + order.departure.address;
    }, [order.departure]);

    const getArrivalAddressButton = useCallback(() => {
        if (order.arrival.address === "" || order.arrival.city === "") {
            return "Куда едем?";
        }
        return order.arrival.city + ', ' + order.arrival.address;
    }, [order.arrival]);


    console.log('order date', order.date)

    return(
        <View style={styles.container}>
            <View style={styles.address_holder}>
                <Button onPress={openDepartureAdddress} projectType="address_input">
                    <LocationMarkIcon />
                    <Text 
                        numberOfLines={1}
                        style={[styles.address_input_text]} 
                        ellipsizeMode="tail">{getDepartureAddressButton()}</Text>
                    <EditOptionsIcon />
                </Button>
                <Button onPress={openArrivaleAdddress} projectType="address_input">
                    <ArrowRightPrimaryIcon style={{ marginHorizontal: 8 }} />
                    <Text 
                        numberOfLines={1}
                        style={[styles.address_input_text]} 
                        ellipsizeMode="tail">{getArrivalAddressButton()}</Text>
                    <TouchableOpacity onPress={(e) => {
                        e.stopPropagation();
                        handleSetOrder({...order, arrival: { city: "", address: "" }})
                    }}>
                        <CrossIcon style={{ marginHorizontal: 7 }}/>
                    </TouchableOpacity>
                </Button>
            </View>
            <SelectCarClass selectCarClass={selectCarClass} activeCarClassIndex={order.carClass}/>
            <View style={styles.details}>
                <TouchableOpacity 
                    onPress={() => handleOpenPaymentSheet()}
                    style={styles.payment_block}>
                        <Text style={styles.payment_title}>Оплата</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5}}>
                            {PAYMENT_METHODS[order.paymentMethod].Icon}
                            <Text style={[styles.payment_text]}>{PAYMENT_METHODS[order.paymentMethod].label}</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => setIsDatePickerOpen(true)}
                    style={styles.time_block}>
                        <Text style={styles.payment_title}>Время и дата</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5 }}>
                            <ClockIcon width={25} style={styles.payment_icon}/>
                            <Text style={[styles.payment_text]}>{dayjs(order.date).format('DD.MM.YYYY HH:mm')}</Text>
                        </View>
                </TouchableOpacity>
                <DatePicker 
                    modal
                    mode="datetime"
                    locale="RU"
                    date={order.date}
                    open={isDatePickerOpen} 
                    onConfirm={handleConformDatepicker}
                    onCancel={handleCloseDatepicker}
                    confirmText="Выбрать"
                    cancelText="Отменить"
                    title="Выберите дату и время"/>
            </View>
            <Text style={styles.price_text}>{order.price !== null && `Цена: ${order.price || 2000}р`}</Text>
            <View style={styles.button_holder}>
                <Button projectType="secondary" onPress={handleOpenOrderAdditionalModal}>
                    <Text style={[styles.secondary_button_text]}>Дополнительно</Text>
                </Button>
                <Button projectType="primary" onPress={handleCreateOrder} disabled={status === MainStatusEnum.CREATING_ORDER}>
                    <Text style={[styles.primary_button_text]}>Заказать авто</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    },
    address_holder: {
        flexDirection: 'column',
        rowGap: 10,
        marginVertical: 20,
        paddingHorizontal: 20
    },
    address_input_text: {
        fontSize: 16,
        color: colors.opacity,
        flexGrow: 1,
        width: '80%'
    },
    carOptions_holder: {
        marginBottom: 2,
        height: 140
    },
    carOption_title: {
        color: colors.white,
        fontSize: 16
    },
    carClass_list: {
        columnGap: 10
    },
    carClass_item: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    activeCarClass: {
        borderColor: colors.stroke,
    },
    carClass_img: {
        width: 100,
        height: 50,
        objectFit: "contain"
    },
    carClass_text: {
        color: colors.white,
        textAlign: 'center'
    },
    details: {
        borderTopColor: colors.stroke,
        borderBottomColor: colors.stroke,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 10,
        flexDirection: 'row'
    },
    payment_block: {
        width: '50%',
        borderRightColor: colors.stroke,
        borderRightWidth: 1,
        paddingVertical: 15,
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 20,
    },
    payment_title: {
        color: colors.white,
    },
    payment_icon: {
        height: 25
    },
    payment_text: {
        color: colors.white
    },
    time_block: {
        width: '50%',
        paddingVertical: 15,
        flexDirection: 'column',
        rowGap: 15,
        paddingHorizontal: 20,
    },
    price_holder: {
        padding: 20
    },
    price_text: {
        color: colors.primary,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 20,
        marginVertical: 20
    },
    button_holder: {
        flexDirection: 'column',
        rowGap: 10,
        paddingHorizontal: 20
    },
    primary_button_text: {
        color: colors.black,
        textAlign: 'center',
        fontSize: 16
    },
    secondary_button_text: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 16
    }
});

export default OrderMenu;