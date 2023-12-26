import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/routers";
import { FC, useEffect, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, Image } from "react-native";
import { StackScreens } from "src/routes";
import { MenuIcon, StatusBarBackground } from "src/shared/img";
import { colors } from "src/shared/style";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { Map } from "src/features/map";
import { EnableGps, setGpsEnabled } from "src/features/gps";
import { useUnit } from "effector-react";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { $bottomSheet, setBottomSheetState, setIndex, setSnapPoints } from "src/features/main/model/BottomSheetStore";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { SetAddress } from "src/features/main/ui/SetAddress";
import { 
    SelectArrivalAddress, 
    SelectDepartureAddress, 
    DepartureAddressMenu, 
    ArriveAddressMenu, 
    SelectArrivalCity, 
    SelectDepartureCity,
    Loader,
    OrderDetails
} from "src/features/main";
import { PaymentMethod } from "src/features/main/ui/PaymentMethod";
import { $main } from "src/features/main/model/MainStore";
import { getGeocode } from "src/features/map/model/map-actions";
import { $map, setArrivalLocation, setDepartureLocation } from "src/features/map/model/MapStore";

type MainProps = NativeStackScreenProps<StackScreens, "Main">;

export const Main: FC<MainProps> = ({ navigation }) => {
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const [handleSetGpsEnabled] = useUnit([setGpsEnabled])
    const [
        { bottomSheetState, index, snapPoints },
        handleSetBottomSheetState
    ] = useUnit([$bottomSheet, setBottomSheetState]);
    const [{orderDetailModal, order}] = useUnit([$main]);
    const [{arrivalLocation, departureLocation}, handleSetDepartureLocation, handleSetArrivalLocation] = useUnit([$map, setDepartureLocation, setArrivalLocation]);

    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    const handleCheckGpsPermission = async () => {
        try {
            const result = await check(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('Result: ', result);
            if (result === RESULTS.GRANTED) {
                setTimeout(() => {
                    console.log('Time out');
                    handleSetGpsEnabled(true);
                    handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
                }, 50);
            }
            else {
                handleSetBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
                sheetModalRef.current?.snapToIndex(0);
            }
            
        } catch (err) {
            handleSetBottomSheetState(BottomSheetStateEnum.ENABLE_GPS);
        }
    }

    useEffect(() => {
        handleCheckGpsPermission();
    }, []);

    useEffect(() => {
        // Получение геокода адреса отправной точки, если заполнены данные
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
        
        // Чистка геокода адресов, если адреса были очищены
        if ((!order.arrival.city || !order.arrival.address) && (arrivalLocation || arrivalLocation)) {
            handleSetArrivalLocation({ lon: null, lat: null});
        }
        if ((!order.departure.city || !order.departure.address) && (departureLocation || departureLocation)) {
            handleSetDepartureLocation({ lon: null, lat: null});
        }
    }, [order.arrival, order.departure]);

    return(
        <View style={styles.layout}>
            {
                Platform.OS === "ios" &&
                <Image source={StatusBarBackground} style={styles.status_bar}/>
            }
            <View style={[styles.header, Platform.OS === "ios" && { marginTop: 50 }]}>
                <TouchableOpacity 
                    style={[styles.menu_button, Platform.OS === "ios" && { padding: 10 }]}
                    onPress={handleOpenDrawer}>
                    <MenuIcon />
                </TouchableOpacity>
            </View>
            <Map />
            <BottomSheet
                ref={sheetModalRef}
                index={index}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
                onChange={(e) => {
                    e === -1 && sheetModalRef.current?.snapToIndex(0);
                    console.log( e);
                }}>

                    {
                        bottomSheetState === BottomSheetStateEnum.LOADING &&
                        <Loader />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.ENABLE_GPS &&
                        <EnableGps />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_ADDRESS &&
                        <SetAddress />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_DEPARTURE_LOCATION &&
                        <DepartureAddressMenu />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_DEPARTURE_CITY &&
                        <SelectDepartureCity/>
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_DEPARTURE_ADDRESS &&
                        <SelectDepartureAddress />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_ARRIVAL_LOCATION &&
                        <ArriveAddressMenu />   
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_ARRIVAL_CITY &&
                        <SelectArrivalCity/>
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.SET_ARRIVAL_ADDRESS &&
                        <SelectArrivalAddress />
                    }
                    {
                        bottomSheetState === BottomSheetStateEnum.DEFINED_PAYMENT_METHOD &&
                        <PaymentMethod />
                    }
            </BottomSheet>
            {
                orderDetailModal && 
                <OrderDetails />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.white,
        position: "relative"
    },
    status_bar: {
        width: '100%',
        height: 50,
        position: "absolute",
        top: 0,
        zIndex: 10
    },
    header: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        position: 'absolute',
        top: 0,
        zIndex: 10
    },
    menu_button: {
        padding: 8,
        backgroundColor: colors.black,
        borderRadius: 12
    },
    bottomSheetBackground: {
        backgroundColor: colors.background
    },
    bottomSheetHandleIndicator: {
        width: '10%',
        backgroundColor: colors.opacity
    },
});