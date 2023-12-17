import React, { useEffect, useState } from "react";
import { DimensionValue, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";

interface ISelectDepartureAddressProps {
    onClose: () => void;
    setDepartureAddress: (address: string) => void;
};

export const SelectDepartureAddress: React.FC<ISelectDepartureAddressProps> = ({ onClose, setDepartureAddress }) => {
    const [ address, setAddress ] = useState<string>("");
    const [ foundCities, setFoundCities ] = useState<string[]>([]);

    const handleSearchCities = () => {
        if (address === "") {
            return;
        }
        // (city).then((res: ICity[]) => {
        //     setFoundCities(res);
        // }).catch(err => {
        //     console.error(err);
        // });
    }

    useEffect(() => {
        const getData = setTimeout(handleSearchCities, 2000);
        return () => {
            clearTimeout(getData);
        };
    }, [address]);

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
                <Text style={[fonts.medium, styles.header_title]}>С какого адреса едем?</Text>
            </View>
            <View style={styles.body}>
                <Input
                    value={address}
                    onChange={setAddress}
                    leftIcon={<BuildingIcon />}
                    placeholder="Адрес"
                    rightIcon={address !== "" && <CrossIcon width={30} />}
                    onRightIconPress={() => setAddress("")}/>
                <ScrollView contentContainerStyle={[styles.dropdown, { height: handleGetDropdownHeight()  }]}>
                    {
                        foundCities.length > 0 &&
                        foundCities.map((address, i: number) => (
                            <TouchableOpacity 
                                onPress={() => setDepartureAddress(address)}
                                key={i}
                                style={i === 0 ? styles.dropdown_item_first : styles.dropdown_item}>
                                    <Text style={[fonts.regular, styles.dropdown_item_text]}>{address}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
                <View style={styles.button_holder}>
                    <Button onPress={() => setDepartureAddress(address)} projectType="primary">
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