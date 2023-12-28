import BottomSheet, { BottomSheetModal, useBottomSheetDynamicSnapPoints } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import { useEffect, useMemo, useRef } from "react";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { $bottomSheet, setBottomSheetState } from "src/features/main/model/BottomSheetStore";
import { colors } from "src/shared/style";

export const MainTest = () => {
    const sheetModalRef = useRef<BottomSheetModal>(null);
    const [
        { bottomSheetState, index },
        handleSetBottomSheetState
    ] = useUnit([$bottomSheet, setBottomSheetState]);

    
    const snapPoints = useMemo(() => {
        if (bottomSheetState === BottomSheetStateEnum.SET_ADDRESS) {
            return Platform.OS === "ios" ? [197, 653] : [177, 623];
        }
        if (bottomSheetState === BottomSheetStateEnum.ENABLE_GPS) {
            return Platform.OS === "ios" ? [440] : [410];
        }
        return [400];
    }, [bottomSheetState]);

    return(
        <View style={styles.layout}>
            <TouchableOpacity onPress={() => {
                sheetModalRef.current.snapToPosition(Platform.OS === "ios" ? 653 : 623);
                handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
            }}>
                <Text>Set address</Text>
            </TouchableOpacity>
            
            {/* <BottomSheet
                ref={sheetModalRef}
                snapPoints={Platform.OS === "ios" ? [197, 653] : [177, 623]}
                index={-1}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                enableHandlePanningGesture={true}>

            </BottomSheet> */}
            <BottomSheet
                ref={sheetModalRef}
                snapPoints={snapPoints}
                index={0}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                enableHandlePanningGesture={true}>

            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: colors.field,
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