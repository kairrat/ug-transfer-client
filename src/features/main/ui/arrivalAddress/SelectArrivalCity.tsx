import { useBottomSheet } from "@gorhom/bottom-sheet";
import { useUnit } from "effector-react";
import React, { useEffect, useState } from "react";
import { DimensionValue, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { ICity } from "src/types/city";
import { BOTTOM_SHEET_SNAP_POINTS } from "../../constants/SnapPoints";
import { BottomSheetStateEnum } from "../../enums/bottomSheetState.enum";
import { $bottomSheet, setBottomSheetState, setSnapPoints } from "../../model/BottomSheetStore";
import { getCities } from "../../model/main-actions";
import { $main, setEditingOrder } from "../../model/MainStore";

interface ISelectArrivalCityProps {};

export const SelectArrivalCity: React.FC<ISelectArrivalCityProps> = ({}) => {
    const { snapToPosition } = useBottomSheet();
    const [{snapPoints}, handleSetSnapPoints, handleSetBottomSheetState] = useUnit([$bottomSheet, setSnapPoints, setBottomSheetState]);
    const [{order, editingOrder}, handleSetEditingOrder] = useUnit([$main, setEditingOrder]);
    const [ foundCities, setFoundCities ] = useState<ICity[]>([]);
    const keyboardVisible = useKeyboardVisibility();
    const [snapPos, setSnapPos] = useState(BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_CITY][0]);
    const [city, setCity] = useState(editingOrder.arrival.city);

    const handleClose = () => {
        handleSetEditingOrder({...editingOrder, arrival: order.arrival});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    const handleSelectCity = (selectedCity: string) => {
        handleSetEditingOrder({...editingOrder, arrival: {...editingOrder.arrival, city: selectedCity}});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);

    }

    const handleApply = () => {
        handleSetEditingOrder({...editingOrder, arrival: {...editingOrder.arrival, city}});
        handleSetBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    const handleSearchCities = () => {
        if (city === "") {
            return;
        }
        getCities(city).then((res: ICity[]) => {
            setFoundCities(res);
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        console.log(city);
        const getData = setTimeout(handleSearchCities, 2000);
        return () => {
            clearTimeout(getData);
        };
    }, [city]);

    useEffect(() => {
        const points = BOTTOM_SHEET_SNAP_POINTS[BottomSheetStateEnum.SET_ARRIVAL_CITY];

        if (foundCities.length === 0) {
            snapToPosition(points[0]);
            handleSetSnapPoints(points);
            setSnapPos(points[0]);
        }
        else if (foundCities.length > 0 && foundCities.length < 4) {
            snapToPosition(points[0] + 200);
            handleSetSnapPoints(points.map(pos => pos + 200));
            setSnapPos(points[0] + 200);
        }
        else {
            snapToPosition(points[0] + 420);
            handleSetSnapPoints(points.map(pos => pos + 420));
            setSnapPos(points[0] + 420);
        }
    }, [foundCities]);

    useEffect(() => {
        if (Platform.OS === "ios") {
            snapToPosition(keyboardVisible ? snapPos + 320 : snapPos);
        }
        else {
            snapToPosition(keyboardVisible ? snapPos + 280 : snapPos);
        }
    }, [keyboardVisible]);

    const handleGetDropdownHeight = (): DimensionValue => {
        if (foundCities.length === 0) {
            return 20;
        }
        else if (foundCities.length < 4) {
            return 220;
        }
        return 430;
    }

    return(
        <View style={styles.container}>
            <View style={styles.container_header}>
                <TouchableOpacity 
                    onPress={handleClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>В какой город едем?</Text>
            </View>
            <View style={styles.body}>
                <Input
                    value={city}
                    onChange={setCity}
                    leftIcon={<BuildingIcon />}
                    placeholder="Город"
                    rightIcon={city !== "" && <CrossIcon width={30} />}
                    onRightIconPress={() => setCity("")}/>
                <ScrollView contentContainerStyle={[styles.dropdown, { height: handleGetDropdownHeight()  }]}>
                    {
                        foundCities.length > 0 &&
                        foundCities.map(({ city: foundCity, id }: ICity, i: number) => (
                            <TouchableOpacity 
                                onPress={() => handleSelectCity(foundCity)}
                                key={id}
                                style={i === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                    <Text style={[fonts.regular, styles.dropdown_item_text]}>{foundCity}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.button_holder}>
                    <Button onPress={handleApply} projectType="primary">
                        <Text style={[fonts.medium, styles.button_text]}>Применить</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
        position: 'relative',
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 1
    },
    header_title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 16,
        color: colors.white,
        marginVertical: 5
    },
    body: {
        paddingVertical: 35
    },
    dropdown: {
        width: '100%',
        marginTop: 10
    },
    dropdown_item: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line
    },
    dropdown_item_first: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        borderTopWidth: 1,
        borderTopColor: colors.line,
    },
    dropdown_item_text: {
        color: colors.white,
        fontSize: 16
    },
    button_holder: {
        marginVertical: 20
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black
    }
});