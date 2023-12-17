import React, { useState, VoidFunctionComponent } from "react";
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { CARS_CLASSES, PAYMENT_METHODS } from "../model/constants";
import { ArrowRightPrimaryIcon, ClockIcon, CrossIcon, EditOptionsIcon, LocationMarkIcon, WhiteWalletIcon } from "src/shared/img";
import { Input } from "src/shared/components/Input";
import { colors, fonts } from "src/shared/style";
import { IAddress } from "../types/findTaxiSchemas";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";
import DatePicker from "react-native-date-picker";
import dayjs from 'dayjs';
import { Button } from "src/shared/components/Button";

interface ISetAddress {
    paymentMethod: PaymentMethodEnum;
    PaymentIcon: any;
    departureAddress: IAddress;
    arrivalAddress: IAddress;
    activeCarClass: number;
    shipDate: Date;
    setDepartureAddress: (cb: ((prev: IAddress) => IAddress)) => void;
    setActiveCarClass: (newState: number) => void;
    onPaymentPress: () => void;
    setShipDate: (newState: Date) => void;
    onDepartureAddressEdit: () => void;
    onArrivalAddressEdit: () => void;
    onClearArriveAddress: () => void;
    onEditDetails: () => void;
}

export const SetAddress: React.FC<ISetAddress> = ({ 
    departureAddress, 
    arrivalAddress,
    activeCarClass,
    paymentMethod, 
    PaymentIcon,
    shipDate,
    setDepartureAddress, 
    setActiveCarClass, 
    onPaymentPress,
    setShipDate,
    onDepartureAddressEdit,
    onArrivalAddressEdit,
    onClearArriveAddress,
    onEditDetails
}) => {
    const [datePickerOpen, setDatePickerOpen] = useState<boolean>(false);
    const getDepartureAddressButton = () => {
        if (departureAddress.address === "" || departureAddress.city === "") {
            return "Откуда едем?";
        }
        return departureAddress.city + ', ' + departureAddress.address;
    }
    const getArrivalAddressButton = () => {
        if (arrivalAddress.address === "" || arrivalAddress.city === "") {
            return "Куда едем?";
        }
        return arrivalAddress.city + ', ' + arrivalAddress.address;
    }
    return(
        <>
            <View style={styles.container}>
                <View style={styles.address_holder}>
                    <Button onPress={onDepartureAddressEdit} projectType="address_input">
                        <LocationMarkIcon />
                        <Text style={[fonts.regular, styles.address_input_text]}>{getDepartureAddressButton()}</Text>
                        <EditOptionsIcon />
                    </Button>
                    <Button onPress={onArrivalAddressEdit} projectType="address_input">
                        <ArrowRightPrimaryIcon style={{ marginHorizontal: 8 }} />
                        <Text style={[fonts.regular, styles.address_input_text]}>{getArrivalAddressButton()}</Text>
                        <TouchableOpacity onPress={(e) => {
                            e.stopPropagation();
                            onClearArriveAddress();
                        }}>
                            <CrossIcon style={{ marginHorizontal: 7 }}/>
                        </TouchableOpacity>
                    </Button>
                </View>
                <View style={styles.carOptions_holder}>
                    <Text style={[fonts.regular, styles.carOption_title]}>Класс авто</Text>
                    
                    <BottomSheetScrollView horizontal contentContainerStyle={styles.carClass_list}>
                        {
                            CARS_CLASSES.map(({label, img}, index) => (
                                <TouchableOpacity 
                                    key={index} 
                                    onPress={() => setActiveCarClass(index)}
                                    style={[styles.carClass_item, index === activeCarClass && styles.activeCarClass]}>
                                        <Image source={img} style={styles.carClass_img}/>
                                        <Text style={styles.carClass_text}>{label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </BottomSheetScrollView>
                </View>
            </View>

            <View style={styles.details}>
                <TouchableOpacity 
                    style={styles.payment_block}
                    onPress={onPaymentPress}>
                        <Text style={styles.payment_title}>Оплата</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5 }}>
                            <PaymentIcon width={25} style={styles.payment_icon}/>
                            <Text style={[fonts.regular, styles.payment_text]}>{PAYMENT_METHODS[paymentMethod].label}</Text>
                        </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.time_block}
                    onPress={() => setDatePickerOpen(true)}>
                        <Text style={styles.payment_title}>Время и дата</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginVertical: 5 }}>
                            <ClockIcon width={25} style={styles.payment_icon}/>
                            <Text style={[fonts.regular, styles.payment_text]}>{dayjs(shipDate).format('DD.MM.YYYY hh:mm')}</Text>
                        </View>
                </TouchableOpacity>
                <DatePicker 
                    modal
                    mode="datetime"
                    locale="RU"
                    date={new Date()}
                    open={datePickerOpen} 
                    onConfirm={(date) => {
                        setDatePickerOpen(false);
                        setShipDate(date);
                    }}
                    onCancel={() => setDatePickerOpen(false)}
                    confirmText="Выбрать"
                    cancelText="Отменить"
                    title="Выберите дату и время"/>
            </View>
            <View style={styles.price_holder}>
                <Text style={[fonts.medium, styles.price_text]}>Цена: 2000р</Text>
            </View>
            <View style={styles.button_holder}>
                <Button projectType="secondary" onPress={onEditDetails}>
                    <Text style={[fonts.medium, styles.secondary_button_text]}>Дополнительно</Text>
                </Button>
                <Button projectType="primary" onPress={() => {}}>
                    <Text style={[fonts.medium, styles.primary_button_text]}>Применить</Text>
                </Button>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    address_holder: {
        flexDirection: 'column',
        rowGap: 10,
        marginVertical: 20,
    },
    address_input_text: {
        fontSize: 16,
        color: colors.opacity,
        flexGrow: 1
    },
    carOptions_holder: {
        marginBottom: 2,
        marginTop: 10,
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
        marginTop: 20,
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
        fontSize: 16
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