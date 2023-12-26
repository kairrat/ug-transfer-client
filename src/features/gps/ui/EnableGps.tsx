import {  useBottomSheet } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import { FC, useEffect, useRef } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { EarthIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { setGpsEnabled } from "../model/GpsStore";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";
import { Button } from "src/shared/components/Button";
import { setBottomSheetState } from "src/features/main/model/BottomSheetStore";
import { BottomSheetStateEnum } from "src/features/main/enums/bottomSheetState.enum";
import { BOTTOM_SHEET_SNAP_POINTS } from "src/features/main/constants/SnapPoints";

type EnableGpsProps = {}

export const EnableGps: FC<EnableGpsProps> = ({}) => {
    const { expand, snapToPosition } = useBottomSheet();
    const [handleSetGpsEnabled] = useUnit([setGpsEnabled]);
    
    const [handleSetBottomSheetState] = useUnit([setBottomSheetState]);

    const handleEnableGps = async () => {
        try {
            const result = await request(Platform.OS === "android" ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log('Result: ', result);
            if (result === RESULTS.GRANTED) {
                handleSetGpsEnabled(true);
            }
        } catch (err) {
            console.error('Failed to requetst permission', err);
        } finally {
            handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS);
        }
    }

    return(
        <View style={styles.container}>
            <EarthIcon style={styles.earth_icon}/>
            <Text style={[fonts.bold, styles.title]}>Где вы находитесь?</Text>
            <View style={styles.description_holder}>
                <Text style={[fonts.medium, styles.description]}>Установите ваше местоположение,чтобы мы могли найти ближайший к вам доступный автомобиль</Text>
            </View>
            <View style={styles.buttons_holder}>
                <Button onPress={handleEnableGps} projectType="primary">
                    <Text style={[fonts.regular, styles.primary_text]}>Включить GPS</Text>
                </Button>
                <Button onPress={() => handleSetBottomSheetState(BottomSheetStateEnum.SET_ADDRESS)} projectType="secondary">
                    <Text style={[fonts.regular, styles.secondary_text]}>Включить позже</Text>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bototmSheetBackground: {
        flex: 1,
        backgroundColor: colors.background
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    earth_icon: {
        marginVertical: 20
    },
    title: {
        fontSize: 16,
        color: colors.white
    },
    description_holder: {
        paddingHorizontal: 10,
        marginVertical: 20
    },
    description: {
        fontWeight: "400",
        fontSize: 16,
        textAlign: 'center',
        color: colors.white
    },
    buttons_holder: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'column',
        rowGap: 10
    },
    primary_text: {
        color: colors.black,
        textAlign: 'center'
    },
    secondary_text: {
        color: colors.white,
        textAlign: 'center'
    }
});