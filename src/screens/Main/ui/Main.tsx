import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/routers";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Platform, StatusBar, Image } from "react-native";
import { StackScreens } from "src/routes";
import { MenuIcon, StatusBarBackground } from "src/shared/img";
import { colors } from "src/shared/style";

import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { FindTaxi } from "src/features/main/ui/FindTaxi";
import { Map } from "src/features/map";
import { $gps, GpsEnableModal, setGpsEnabled } from "src/features/gps";
import { useUnit } from "effector-react";

type MainProps = NativeStackScreenProps<StackScreens, "Main">;
enum SheetModalStates {
    LOADING = 'loading',
    ENABLE_GPS = 'enable_gps',
    FIND_TAXI = 'find_taxi',
    ORDER_CAR = 'order_car',
    ADDITIONAL_INFO = 'additional_info',
    ACCEPTED = 'accepted',
    SEARCHING = 'searching',
    EMPTY = 'empty',
    PAYMENT_METHOD = 'payment_method'
}

export const Main: FC<MainProps> = ({ navigation }) => {
    const [sheetModalState, setSheetModalState] = useState<SheetModalStates>(SheetModalStates.LOADING);
    const [location, setLocation] = useState({ departure: null, arrival: null, default: { lat: 55.75333, lon: 37.62176 } });

    const [_, handleSetGpsEnabled] = useUnit([$gps, setGpsEnabled])

    const handleLoadSheetModalState = async () => {
        await handleCheckGpsPermission();
    }

    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    const handleCheckGpsPermission = async () => {
        try {
            const result = await check(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result !== RESULTS.GRANTED) {
                handleSetGpsEnabled(true);
                handleSetFindTaxiState();
            }
            else {
                handleSetEnableGpsState();
            }
            
        } catch (err) {
            setSheetModalState(SheetModalStates.ENABLE_GPS);
        }
    }

    const handleSetFindTaxiState = () => {
        setSheetModalState(SheetModalStates.FIND_TAXI);
    }

    const handleSetEnableGpsState = () => {
        setSheetModalState(SheetModalStates.ENABLE_GPS);
    }

    const handleClearArrivalLocation = () => {
        setLocation(prev => ({...prev, arrival: null}));
    }

    useEffect(() => {
        handleLoadSheetModalState();
    }, []);

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
            <Map location={location} clearPrice={() => {}} setPrice={(distance) => {}}/>
            {
                sheetModalState === SheetModalStates.ENABLE_GPS &&
                <GpsEnableModal setFindTaxiState={handleSetFindTaxiState} />
            }
            {
                sheetModalState === SheetModalStates.FIND_TAXI &&
                <FindTaxi
                    setLocation={setLocation}
                    onClearArrivalAddress={handleClearArrivalLocation}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.background,
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
    
});