import { FC } from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "src/shared/style";
import { Order } from "src/types/order";
import { AddressBlock } from "./AddressBlock";
import { OrderStatusEnum } from '../model/orderEnum';
import { PhoneRoundedIcon, TelegramIcon, UnknownUser } from "src/shared/img";

type TripDetailFormProps = {
    order?: Order
}

export const TripDetailForm: FC<TripDetailFormProps> = ({ order }) => {
    return(
        <>
            <ScrollView style={styles.body}>
                <View style={styles.info_holder}>
                        <AddressBlock 
                            departureAddress={order?.order_start_full || ""} 
                            departureCity={order?.order_start || ""} 
                            arrivalAddress={order?.order_end_full || ""} 
                            arrivalCity={order?.order_end || ""}/>
                </View>
                <View style={styles.params}>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Время подачи: </Text>
                        <Text style={styles.param_value}>ближайшее </Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Расстояние: </Text>
                        <Text style={styles.param_value}>153 км</Text>
                    </View>
                    <View style={styles.param_item}>
                        <Text style={styles.param_key}>Дополнительно: </Text>
                        <Text style={styles.param_value}>детское кресло</Text>
                    </View>
                </View>
                {
                    order.order_driver && 
                    <>
                        <View style={styles.section}>
                            <Text style={styles.driver_title}>Водитель</Text>
                            <Text style={styles.driver_name}>{order.order_driver.name}</Text>
                            <View style={{ flexDirection: 'row', columnGap: 10}}>
                                <Image source={order.order_driver.avatar ? { uri: order.order_driver.avatar } : UnknownUser}/>
                                <View style={styles.driver_info}>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center'}}>
                                        <Text style={{ color: colors.opacity, fontSize: 16 }}>{order.order_tariff}</Text>
                                        <Text style={{ color: colors.opacity, fontSize: 16 }}>{order.order_driver.carBrand}</Text>
                                        <Text style={{ color: colors.opacity, fontSize: 16 }}>{order.order_driver.carModel}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'center'}}>
                                        <Text style={{ color: colors.opacity, fontSize: 16 }}>{order.order_driver.carNumber}</Text>
                                        <Text style={{ color: colors.opacity, fontSize: 16 }}>{order.order_driver.carColor}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.section}>
                            <View style={{ flexDirection: "row", columnGap: 5}}>
                                <Text style={{color: colors.white, fontWeight: "500", fontSize: 16}}>Тел. водителя:</Text>
                                <Text style={{color: colors.white, fontWeight: "300", fontSize: 16}}>+7 988 888 88 88</Text>
                            </View>
                        </View>
                    </>
                }
                <View style={styles.price_holder}>
                    <Text style={styles.price_text}>Цена: {order?.order_price || "2000"}р</Text>
                    <Text style={styles.payment_text}>Наличные</Text>
                </View>
                <View style={styles.order_number}>
                    <Text style={styles.order_number_key}>Номер заказа:</Text>
                    <Text style={styles.order_number_value}>{order?.order_id || "698697678"}</Text>
                </View>
            </ScrollView>
            <View style={styles.footer}>
                {
                    order?.order_status === OrderStatusEnum.selling &&
                    <Text style={styles.finding_driver_text}>Водитель ищется...</Text>
                }
                <TouchableOpacity style={styles.footer_contact_button}>
                    <Text style={styles.footer_button_text}>
                        {
                            order.order_status === OrderStatusEnum.selling ?
                            "В ожидании..."
                            : "Связь"
                        }
                    </Text>
                    <View style={styles.footer_button_icon}>

                        <TelegramIcon />
                    </View>
                    <View style={styles.footer_button_icon}>
                        <PhoneRoundedIcon />
                    </View>
                </TouchableOpacity>
                <Text style={styles.footer_cancel_text}>Для отмены заказа свяжитесь с диспетчером</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    body: {
        flexGrow: 1
    },
    info_holder: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    section: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    params: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: colors.line,
        borderBottomWidth: 1
    },
    param_item: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    param_key: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.white,
        marginVertical: 3
    },
    param_value: {
        fontSize: 16,
        fontWeight: "300",
        color: colors.white
    },
    price_holder: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomColor: colors.line,
        borderBottomWidth: 1
    },
    price_text: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: "500"
    },
    payment_text: {
        color: colors.opacity,
        fontSize: 16,
    },
    order_number: {
        flexDirection: "row",
        alignItems: 'center',
        columnGap: 5,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomColor: colors.line,
        borderBottomWidth: 1
    },
    order_number_key: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "500"
    },
    order_number_value: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "300"
    },
    driver_title: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.white
    },
    driver_name: {
        fontSize: 16,
        fontWeight: "300",
        color: colors.white,
        marginVertical: 10
    },
    driver_info: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flexGrow: 1
    },
    footer: {
        paddingBottom: 30,
        paddingTop: 10,
        paddingHorizontal: 20
    },
    finding_driver_text: {
        color: colors.error,
        fontWeight: "400",
        fontSize: 16,
        textAlign: "center",
        marginVertical: 10
    },
    footer_contact_button: {
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        flexDirection: 'row',
        alignItems: "center"
    },
    footer_button_text: {
        color: colors.stroke,
        textAlign: 'center',
        marginVertical: 12,
        flexGrow: 1,
        fontSize: 16
    },
    footer_button_icon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center",
        width: 50,
        height: '100%',
        borderLeftWidth: 1,
        borderLeftColor: colors.stroke
    },
    footer_cancel_text: {
        fontSize: 14,
        fontWeight: "300",
        color: colors.opacity,
        textAlign: 'center'
    },
});