import { Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { colors, fonts } from "src/shared/style";
import { TBottomSheetMethods } from "../types/bottomSheetMethods";
import { FC, useEffect, useState } from "react";
import { CrossIcon } from "src/shared/img";
import { BottomSheetFlatList, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Button } from "src/shared/components/Button";
import { BottomSheetStateEnum } from "../enums/bottomSheetState.enum";
import { getCities } from "../model/order-actions";
import { useUnit } from "effector-react";
import { $main, setEditingOrder, setOrder } from "src/features/main/model/MainStore";

type Props = TBottomSheetMethods & {};

const ArrivalCityAdditonal: FC<Props> = function({setBottomSheetState}) {
    const [search, setSearch] = useState<string>(""); // Input state
    const [foundCities, setFoundCities] = useState<string[]>([]); // Fetched cities to select from list
    const [{editingOrder}, handleSetEditingOrder] = useUnit([$main, setEditingOrder]);
    const [{ order, status }, handleSetOrder] = useUnit([$main, setOrder]);


    /**
     * Move back to menu without changes
     */
    function close() {
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    /**
     * Changes text in search state and filters fetched cities (foundCities state)
     * @param text changing text of input
     */
    function handleChangeSearch(text: string) {
        setSearch(text);
        setFoundCities(prev => prev.filter(item => item.toLowerCase().includes(text.toLowerCase())));
    }

    /**
     * Selects city and moves back to menu
     * @param selectedCity city to select
     */
    function handleSelectCity(selectedCity: string) {
        const index = order.index;
        const additionalArrivals = order.additionalArrivals?.slice() || [];
        const arrival = additionalArrivals[index];
        arrival.city = selectedCity;

        handleSetOrder({...order, additionalArrivals });
        setBottomSheetState(BottomSheetStateEnum.SET_ARRIVAL_LOCATION);
    }

    
    /**
     * Fetching cities from yandex
     */
    function handleSearchCities() {
        if (search === "") {
            return;
        }
        getCities(search).then((res: any) => {
            setFoundCities(res.results.map((item) => item.title.text));
        }).catch(err => {
            console.error(err);
        });
    }

    /**
     * Bounced fetching cities
     */
    useEffect(() => {
        const getDataTimerId = setTimeout(handleSearchCities, 2000);
        return () => {
            clearTimeout(getDataTimerId);
        };
    }, [search]);

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.container_header}>
                    <TouchableOpacity 
                        onPress={close}
                        style={styles.close_button}>
                            <CrossIcon />
                    </TouchableOpacity>
                    <Text style={[fonts.medium, styles.header_title]}>В какой город остановки едем?</Text>
                </View>
                <View style={styles.body}>
                    <BottomSheetTextInput 
                            style={styles.input} 
                            value={search} 
                            onChangeText={handleChangeSearch}/>
                </View>
                {
                    foundCities.length > 0 &&
                    <BottomSheetFlatList
                    data={foundCities}
                    keyExtractor={(city) => `${city}`}
                    style={styles.dropdown}
                    renderItem={({item, index}) => (
                        <TouchableOpacity 
                                onPress={() => handleSelectCity(item)}
                                style={index === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                    <Text style={[fonts.regular, styles.dropdown_item_text]}>{item}</Text>
                        </TouchableOpacity>
                    )}/>
                }
                <View style={styles.button_holder}>
                    <Button onPress={() => {}} projectType="primary">
                        <Text style={[styles.button_text]}>Применить</Text>
                    </Button>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    container_header: {
        position: 'relative'
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 20,
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
        paddingVertical: 35,
        paddingHorizontal: 20
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.stroke,
        borderRadius: 7,
        backgroundColor: colors.gray,
        paddingVertical: 12,
        paddingHorizontal: 10,
        color: colors.white
    },
    dropdown: {
        width: '100%',
        paddingHorizontal: 20,
        borderWidth: 2,
        maxHeight: 200
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
        // marginVertical: 20,
        paddingHorizontal: 20,
        // paddingBottom: 20
    },
    button_text: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.black,
    }
});

export default ArrivalCityAdditonal;