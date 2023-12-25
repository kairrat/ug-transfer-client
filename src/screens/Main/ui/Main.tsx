import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerActions } from "@react-navigation/routers";
import { FC, useEffect, useRef, useState } from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Platform, StatusBar, Image } from "react-native";
import { StackScreens } from "src/routes";
import { MenuIcon, StatusBarBackground } from "src/shared/img";
import { colors } from "src/shared/style";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { GpsModalSheet } from "src/features/main/ui/GpsModalSheet";
import { FindTaxi } from "src/features/main/ui/FindTaxi";
import { Map } from "src/features/map";

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
    const [sheetModalResizing, setSheetModalResizing] = useState<{ handle: boolean, content: boolean }>({ handle: true, content: true });
    const [enabledGps, setEnabledGps] = useState<boolean>(false);
    const [snapPoints, setSnapPoints] = useState<(string | number)[]>([Platform.OS === "ios" ? 440 : 410]);
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const [location, setLocation] = useState({ departure: null, arrival: null, default: { lat: 55.75333, lon: 37.62176 } });

    const handleLoadSheetModalState = async () => {
        await handleCheckGpsPermission();
    }

    const handleOpenDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    }

    const handleCheckGpsPermission = async () => {
        try {
            const result = await check(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.GRANTED) {
                setEnabledGps(true);
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
        setSnapPoints([Platform.OS === "ios" ? 440 : 410]);
        sheetModalRef.current.snapToIndex(0);
    }

    const handleEnableGps = async () => {
        try {
            const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            if (result === RESULTS.GRANTED) {
                setEnabledGps(true);
            }
        } catch (err) {
            console.error('Failed to requetst permission', err);
        } finally {
            handleSetFindTaxiState();
        }
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
            <BottomSheet 
                ref={sheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                // enableContentPanningGesture={sheetModalResizing.content}
                // enableHandlePanningGesture={sheetModalResizing.handle}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
                onChange={(e) => {
                    e === -1 && sheetModalRef.current?.snapToIndex(0);
                    console.log( e);
                }}>
                    {
                        sheetModalState === SheetModalStates.ENABLE_GPS &&
                        <GpsModalSheet onAccept={handleEnableGps} onDecline={handleSetFindTaxiState}/>
                    }
                    {
                        sheetModalState === SheetModalStates.FIND_TAXI &&
                        <FindTaxi 
                            sheetModalRef={sheetModalRef} 
                            setSnapPoints={setSnapPoints} 
                            setLocation={setLocation}
                            onClearArrivalAddress={handleClearArrivalLocation}/>
                    }
            </BottomSheet>
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
    bottomSheetBackground: {
        backgroundColor: colors.background
    },
    bottomSheetHandleIndicator: {
        width: '10%',
        backgroundColor: colors.opacity
    }
});