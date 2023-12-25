import React, { useContext, useEffect, useState } from "react";
import { DimensionValue, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { ICity } from "src/types/city";
import { BottomSheetContext } from "../../context/BottomSheetContext";

interface ISelectDepartureCityProps {
    snapPosition: number;
    onClose: () => void;
    debounceCb: (city: string) => Promise<ICity[]>;
    setDepartureCity: (city: string) => void;
};

export const SelectDepartureCity: React.FC<ISelectDepartureCityProps> = ({ onClose, setDepartureCity, debounceCb, snapPosition: defaultSnapPosition }) => {
    const { modalRef, setSnapPoints } = useContext(BottomSheetContext);
    const [ city, setCity ] = useState<string>("");
    const [ foundCities, setFoundCities ] = useState<ICity[]>([]);
    const [ snapPosition, setSnapPosition ] = useState<number>(defaultSnapPosition);
    const isKeyboardVisible = useKeyboardVisibility();

    const handleSearchCities = () => {
        if (city === "") {
            return;
        }
        debounceCb(city).then((res: ICity[]) => {
            setFoundCities(res);
        }).catch(err => {
            console.error(err);
        });
    }

    useEffect(() => {
        const getData = setTimeout(handleSearchCities, 2000);
        return () => {
            clearTimeout(getData);
        };
    }, [city]);

    useEffect(() => {
        if (foundCities.length === 0) {
            setSnapPoints([defaultSnapPosition]);
            modalRef.current?.snapToPosition(defaultSnapPosition);
            setSnapPosition(defaultSnapPosition);
        }
        else if (foundCities.length > 0 && foundCities.length < 4) {
            setSnapPoints(['60%']);
            modalRef.current?.snapToPosition('60%');
            setSnapPosition(60);
        }
        else {
            setSnapPoints(['90%']);
            modalRef.current?.snapToPosition('90%');
            setSnapPosition(90);
        }
    }, [foundCities]);

    useEffect(() => {
        if (Platform.OS === "ios") {
            modalRef.current?.snapToPosition(isKeyboardVisible ? 605 : 285);
            setSnapPoints(isKeyboardVisible ? [605] : [285]);
        }
        else {
            modalRef.current?.snapToPosition(isKeyboardVisible ? 575 : 255);
            setSnapPoints(isKeyboardVisible ? [575] : [255]);
        }
    }, [isKeyboardVisible]);

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
                    onPress={onClose}
                    style={styles.close_button}>
                        <CrossIcon />
                </TouchableOpacity>
                <Text style={[fonts.medium, styles.header_title]}>С какого города едем?</Text>
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
                                onPress={() => setDepartureCity(foundCity)}
                                key={id}
                                style={i === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                    <Text style={[fonts.regular, styles.dropdown_item_text]}>{foundCity}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.button_holder}>
                    <Button onPress={() => setDepartureCity(city)} projectType="primary">
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