import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/routers";
import { FC, useEffect, useMemo, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Platform, Image, Modal } from "react-native";
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
import { BOTTOM_SHEET_SNAP_POINTS } from "src/features/main/constants/SnapPoints";
import { STATE_COMPONENTS } from "../constants/StateComponents";

type MainProps = NativeStackScreenProps<StackScreens, "Main">;

export const Main: FC<MainProps> = ({ navigation }) => {
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const [handleSetGpsEnabled] = useUnit([setGpsEnabled])
    const [
        { bottomSheetState },
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
            if (result === RESULTS.GRANTED) {
                console.log('Granted', result);
                handleSetGpsEnabled(true);
                sheetModalRef.current?.snapToPosition(Platform.OS === "ios" ? 653 : 623);
                handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
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

    const snapPoints = useMemo(() => BOTTOM_SHEET_SNAP_POINTS[bottomSheetState], [bottomSheetState]);

    return(
        <View style={styles.layout}>
            {
                Platform.OS === "ios" &&
                <Image source={StatusBarBackground} style={styles.status_bar}/>
            }
            <Modal visible={orderDetailModal}>
                <OrderDetails />
            </Modal>
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
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
                onChange={(e) => {
                    e === -1 && sheetModalRef.current?.snapToIndex(0);
                }}>
                    {STATE_COMPONENTS[bottomSheetState]}
            </BottomSheet>
            
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