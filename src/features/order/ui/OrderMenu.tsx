import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { colors } from "src/shared/style";
import { Button } from "src/shared/components/Button";
import {
    ArrowRightPrimaryIcon,
    ClockIcon,
    CrossIcon,
    EditOptionsIcon,
    LocationMarkIcon,
} from "src/shared/img";
import { useUnit } from "effector-react";
import { $main, setFinishedOrder, setOrder, setOrderProcessStatus, setStatus } from "src/features/main/model/MainStore";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import SelectCarClass from "./SelectCarClass";
import {
    CARS_CLASSES,
    PAYMENT_METHODS,
} from "src/features/main/constants/constants";
import dayjs from "dayjs";
import DatePicker from "react-native-date-picker";
import Checkbox from "@react-native-community/checkbox";
import { MainStatusEnum } from "src/features/main/enums/mainStatus.enum";
import axios from "axios";
import { CreateOrderDto } from "src/features/main/types/dto/createOrder.dto";
import { createOrder } from "../model/order-actions";
import { $profile } from "src/features/profile";
import { getGeocode } from "src/features/map/model/map-actions";
import { $map, setArrivalLocation, setDepartureLocation } from "src/features/map";

type Props = TBottomSheetMethods & {};

const OrderMenu: FC<Props> = function ({ setBottomSheetState }) {
    const [{ order, status }, handleSetOrder] = useUnit([$main, setOrder]);
    const [{arrivalLocation, departureLocation}, handleSetDepartureLocation, handleSetArrivalLocation] = useUnit([$map, setDepartureLocation, setArrivalLocation]);
    const [
        {orderProcessStatus}, 
        handleSetOrderProcessStatus,
        handleSetFinishedOrder
    ] = useUnit([$main, setOrderProcessStatus,setStatus, setFinishedOrder]);
    const [{ profile }] = useUnit([$profile]);


    useEffect(() => {
        
        if(orderProcessStatus === "took") {
            setBottomSheetState(BottomSheetStateEnum.ORDER_PROCESS);
        }
        else if(orderProcessStatus === "complete") {
            setBottomSheetState(BottomSheetStateEnum.ORDER_FINISHED);

        }

    }, )



    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

    function openDepartureAdddress() {
        setBottomSheetState(BottomSheetStateEnum.SET_DEPARTURE_LOCATION);
    }

    function openArrivaleAdddress() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    function selectCarClass(index: number) {
        handleSetOrder({ ...order, carClass: index });
    }

    // Close datepicker
    function handleCloseDatepicker() {
        setIsDatePickerOpen(false);
    }

    // Confirm date picker
    function handleConformDatepicker(date: Date) {
        setIsDatePickerOpen(false);
        handleSetOrder({ ...order, date });
    }
    const [currentTariff, setCurrentTariff] = useState("");

    // Create order
    useEffect(() => {
        const handleCreateOrders = async () => {
            try {
                if (
                    order.departure.city &&
                    order.departure.address &&
                    order.arrival.city &&
                    order.arrival.address &&
                    order.arrival &&
                    CARS_CLASSES[order.carClass].label
                                 )
                     {
                    let formData = new FormData();
                    let tarif: string;
    
                    if (CARS_CLASSES[order.carClass].label === "Срочный") {
                        tarif = "Стандарт";
                    } else {
                        tarif = CARS_CLASSES[order.carClass].label;
                    }
                    formData.append(
                        "start",
                        `${order.departure.city}, ${order.departure.address}`
                    );
                    formData.append(
                        "end",
                        `${order.arrival.city}, ${order.arrival.address}`
                    );
                    formData.append(
                        "tarif",
                        `${tarif}`
                    );
                    const config = {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    };
    
                    const response = await axios.post(
                        "https://vse-zakazy.ru/wp-content/themes/ug-transfer-operator/tariffCalc/calc.php",
                        formData,
                        config
                    );
    

                    handleSetOrder({ ...order, distance: response.data.fullDisctance });

                    
    
                } else {
                    console.log("Не хватает данных для отправки запроса.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        handleCreateOrders();
    }, [
        order.departure.city,
        order.departure.address,
        order.arrival.city,
        order.arrival.address,
        order.arrival, CARS_CLASSES[order.carClass].label
    ]);



    useEffect(() => {
        if (order.carClass) {
            setCurrentTariff(
                CARS_CLASSES.find(carClass => carClass.label === order.carClass)?.label || ""
            );
        }
    }, [order.carClass]);
    

    useEffect(() => {
        if (order.departure.city && order.departure.address) {
            getGeocode(`${order.departure.city},${order.departure.address}`).then((res: any) => {
                const points = res.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos;
                if (points) {
                    const lat = parseFloat(points.split(' ')[1]);
                    const lon = parseFloat(points.split(' ')[0]);
                    
                    handleSetArrivalLocation({lon, lat});
                }
            }).catch(err => console.error('Failed to get geocode of departure address: ', err))
        }
        // Получение геокода адреса конечной точки, если заполнены данные
        if (order.arrival.city && order.arrival.address) {
            getGeocode(`${order.arrival.city},${order.arrival.address}`).then((res: any) => {
                const points = res.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos;
                if (points) {
                    const lat = parseFloat(points.split(' ')[1]);
                    const lon = parseFloat(points.split(' ')[0]);
                    
                    handleSetDepartureLocation({lon, lat});
                }
            }).catch(err => console.error('Failed to get geocode of arrival address: ', err))
        }
        
        if ((!order.arrival.city || !order.arrival.address) && (arrivalLocation || arrivalLocation)) {
            handleSetArrivalLocation({ lon: null, lat: null});
        }
        if ((!order.departure.city || !order.departure.address) && (departureLocation || departureLocation)) {
            handleSetDepartureLocation({ lon: null, lat: null});
        }
    }, [order.arrival, order.departure]);

  
    

    const handleCreateOrder = async () => {
        if (!profile) {
            return;
        }

        const newOrder: CreateOrderDto = {
            from: order.departure.city,
            to: order.arrival.city,
            fulladressend: order.departure.address,
            fulladressstart: order.arrival.address,
            date: dayjs(order.date).format("DD.MM.YYYY"),
            time: dayjs(order.date).format("HH:mm"),
            comment: order.comment,
            countPeople:
                order.passangersAmount !== "" ? order.passangersAmount : "1",
            tariffId: CARS_CLASSES[order.carClass].label,
            isUrgent:
                CARS_CLASSES[order.carClass].label === "Срочный" ? true : false,
            isAnimal: order.params.animalTransfer,
            isBaby: order.params.babyChair,
            isBuster: order.params.buster,
            isBagage: order.baggage !== "" ? order.baggage : "1",
            full_price: 200,
            phone_number: profile.phone_number,
        };
        try {
            console.log("New order: ", newOrder);
            const response: any = await createOrder(newOrder);
            console.log(response, response.data);
            if (response && response.message === "success") {
                setBottomSheetState(BottomSheetStateEnum.ORDER_PROCESS);
            } else if (
                response &&
                response.error_message &&
                response.status === "false"
            ) {
                toast.show(response.error_message, {
                    type: "danger",
                    placement: "top",
                    textStyle: {
                        textAlign: "center",
                    },
                });
            }
        } catch (err) {
            toast.show("Не получилось создать заказ", {
                type: "error",
            });
            console.error("Failed to create order", err);
        } finally {
        }
    };

    


    // Open modal with order additional information
    function handleOpenOrderAdditionalModal() {
        setBottomSheetState(BottomSheetStateEnum.ORDER_DETAIL);
    }

    const handleOpenPaymentSheet = () => {
        setBottomSheetState(BottomSheetStateEnum.DEFINED_PAYMENT_METHOD);
    };

    const getDepartureAddressButton = useCallback(() => {
        if (order.departure.address === "" || order.departure.city === "") {
            return "Откуда едем?";
        }
        return order.departure.city + ", " + order.departure.address;
    }, [order.departure]);

    const getArrivalAddressButton = useCallback(() => {
        if (order.arrival.address === "" || order.arrival.city === "") {
            return "Куда едем?";
        }
        return order.arrival.city + ", " + order.arrival.address;
    }, [order.arrival]);

    return (
        <View style={styles.container}>
            <View style={styles.address_holder}>
                <Button
                    onPress={openDepartureAdddress}
                    projectType="address_input"
                >
                    <LocationMarkIcon />
                    <Text
                        numberOfLines={1}
                        style={[styles.address_input_text]}
                        ellipsizeMode="tail"
                    >
                        {getDepartureAddressButton()}
                    </Text>
                    <EditOptionsIcon />
                </Button>
                <Button
                    onPress={openArrivaleAdddress}
                    projectType="address_input"
                >
                    <ArrowRightPrimaryIcon style={{ marginHorizontal: 8 }} />
                    <Text
                        numberOfLines={1}
                        style={[styles.address_input_text]}
                        ellipsizeMode="tail"
                    >
                        {getArrivalAddressButton()}
                    </Text>
                    <TouchableOpacity
                        onPress={(e) => {
                            e.stopPropagation();
                            handleSetOrder({
                                ...order,
                                arrival: { city: "", address: "" },
                            });
                        }}
                    >
                        <CrossIcon style={{ marginHorizontal: 7 }} />
                    </TouchableOpacity>
                </Button>
                <Button
            onPress={() => setIsDatePickerOpen(true)} // Обработчик нажатия на кнопку "Время и дата"
            projectType="address_input" // Можно изменить тип проекта на необходимый
        >
            <ClockIcon width={25} style={styles.payment_icon} />
            <View style={[styles.centerLine2]}>
            <Text                         style={[styles.address_input_text]}
>
            {dayjs(order.date).format('DD.MM.YYYY')}
            </Text>
            <View style={styles.button_holder3}>
                <Text      style={[styles.date_input_text]}                       
>              {dayjs(order.date).format('HH:mm')}
  </Text>
            </View>
        </View>
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
                    title="Выберите дату и время"
                />
                </Button>
            
            </View>
            <SelectCarClass
                selectCarClass={selectCarClass}
                activeCarClassIndex={order.carClass}
            />
            <View style={styles.details}>
                <TouchableOpacity
                    onPress={() => handleOpenPaymentSheet()}
                    style={styles.payment_block}
                >
                    <Text style={styles.payment_title}> Способ oплаты</Text>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10,
                            marginVertical: 5,
                        }}
                    >
                        {PAYMENT_METHODS[order.paymentMethod].Icon}
                        <Text style={[styles.payment_text]}>
                            {PAYMENT_METHODS[order.paymentMethod].label}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleOpenOrderAdditionalModal}
                    style={styles.time_block}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            columnGap: 10,
                            marginVertical: 20,
                        }}
                    >
                        <Text style={[styles.additional_text]}>
                        Дополнительно
                        </Text>
                    </View>
                </TouchableOpacity>
               
            </View>
            <Text style={styles.price_text}>
            
            </Text>
            <View style={styles.button_holder}>
    <Button
        projectType="primary"
        onPress={() => handleCreateOrder()}
        disabled={status === MainStatusEnum.CREATING_ORDER}
    >
        <View style={[styles.primary_button_text, styles.centerLine]}>
            <Text>
                Заказать авто
            </Text>
            <View style={styles.button_holder2}>
                <Text>   {order.price !== null &&
                    order.price !== undefined &&
                    `${order.price}р`}</Text>
            </View>
        </View>
    </Button>
</View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    address_holder: {
        flexDirection: "column",
        rowGap: 10,
        marginVertical: 20,
        paddingHorizontal: 20,
    },
    address_input_text: {
        fontSize: 16,
        color: colors.opacity,
        flexGrow: 1,
        width: "80%",
    },
    date_input_text: {
        fontSize: 16,
        color: colors.opacity,
        flexGrow: 1,
    },
    carOptions_holder: {
        marginBottom: 2,
        height: 140,
    },
    carOption_title: {
        color: colors.white,
        fontSize: 16,
    },
    carClass_list: {
        columnGap: 10,
    },
    carClass_item: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: "transparent",
    },
    activeCarClass: {
        borderColor: colors.stroke,
    },
    carClass_img: {
        width: 100,
        height: 50,
        objectFit: "contain",
    },
    carClass_text: {
        color: colors.white,
        textAlign: "center",
    },
    details: {
        borderTopColor: colors.stroke,
        borderBottomColor: colors.stroke,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginTop: 10,
        flexDirection: "row",
    },
    payment_block: {
        width: "50%",
        borderRightColor: colors.stroke,
        borderRightWidth: 1,
        paddingVertical: 15,
        flexDirection: "column",
        rowGap: 15,
        paddingHorizontal: 20,
    },
    payment_title: {
        color: colors.white,
    },
    payment_icon: {
        height: 25,
    },
    payment_text: {
        color: colors.white,
    },
    additional_text: {
        color: colors.white,
        fontSize: 20,


    },
    time_block: {
        width: "50%",
        paddingVertical: 15,
        flexDirection: "column",
        rowGap: 15,
        paddingHorizontal: 20,
    },
    price_holder: {
        padding: 20,
        
    },
    price_text: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "500",
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    button_holder: {
        flexDirection: "row",
        display : 'flex',
        justifyContent : 'space-between',
        rowGap: 10,
        
        
        paddingHorizontal: 20,
    },
    button_holder2: {
      position: 'absolute',
      right : -100,
      fontSize: 16,

    },
    button_holder3: {
        position: 'absolute',
        right : -80,
        fontSize: 16,
  
      },
    primary_button_text: {
        color: colors.black,
        flexDirection : 'row',
        display: 'flex',
        justifyContent : 'space-around',
        textAlign: "center",
        fontSize: 16,   
    },
    date_button_text: {
        color: colors.black,
        flexDirection : 'row',
        display: 'flex',
        justifyContent : 'space-evenly',
        textAlign: "center",
        fontSize: 16,   
    },
    centerLine: {
        width : '50%',
        borderRightColor: colors.stroke,
        borderRightWidth: 2,
    },
    centerLine2: {
        width : '40%',
        borderRightColor: colors.stroke,
        borderRightWidth: 2,
    },
    secondary_button_text: {
        color: colors.white,
        textAlign: "center",
        fontSize: 16,
    },
});

export default OrderMenu;
