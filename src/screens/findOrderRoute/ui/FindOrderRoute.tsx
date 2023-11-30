import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { colors } from "../../../shared/style";
import { FindOrderRouteHeader } from "./FindOrderRouteHeader";
import { Button } from "../../../shared/components";
import LocationMark from '@assets/img/LocationMark.svg';
import BoArrowDown from '@assets/img/BoArrowDown.svg';
import { Dropdown } from "../../../shared/components/dropdown/Dropdown";

type CompProps = NativeStackScreenProps<StackScreens, "FindOrderRoute">;

const DEPARTURE_CITIES = [
    {label: "Москва", value: "москва"},
    {label: "Санкт-Петербург", value: "санкт-петербург"}
    // {label: "", value: ""}
];

export const FindOrderRoute: React.FC<CompProps> = () => {
    const navigation = useNavigation<any>();
    const handleMoveBack = () => {
        navigation.goBack();
    }
    const [departureCity, setDepartureCity] = useState<string>(null);
    const [arrivalCity, setArrivalCity] = useState<string>(null);
    const [carType, setCarType] = useState<string>(null);
    const [price, setPrice] = useState<number | string>(null);
    const [openDropdown, setOpenDropdown] = useState<string>(null);

    const handleDepartureCityChange = (e: string) => {
        setDepartureCity(e);
    }

    const handleArrivalCityChange = (e: string) => {
        setArrivalCity(e);
    }

    const handleCarTypeChange = (e: string) => {
        setCarType(e);
    }

    const handlePriceChange = (e: string | number) => {
        setPrice(e);
    }

    return (
        <>
        <SafeAreaView
            style={{
            flex: 1,
            backgroundColor: colors.background,
            paddingTop: "2%",
          }}
        >
            <FindOrderRouteHeader onBack={handleMoveBack}/>
            <ScrollView style={{ padding: 10 }}>
                <View style={{position: 'relative', marginVertical: 10}}>
                    <View style={{position: 'absolute', left: 20, top: 10, zIndex: 6000}}>
                        <LocationMark />
                    </View>
                    <Dropdown 
                        placeholder={"Город отправки"} 
                        list={DEPARTURE_CITIES} 
                        currentValue={departureCity} 
                        setCurrentValue={handleDepartureCityChange} 
                        icon={true}
                        dropdownDirection="BOTTOM"
                        zIndex={6004}
                        name="departureCity"
                        openDropdown={openDropdown}
                        setOpenName={setOpenDropdown}/>
                </View>

                <View style={{position: 'relative', marginVertical: 10}}>
                    <View style={{position: 'absolute', left: 20, top: 10, zIndex: 6000}}>
                        <LocationMark />
                    </View>
                    <Dropdown 
                        placeholder={"Город прибытия"} 
                        list={[{label: "Москва", value: "москва"}]} 
                        currentValue={arrivalCity} 
                        setCurrentValue={handleArrivalCityChange} 
                        icon={true}
                        dropdownDirection="BOTTOM"
                        zIndex={6003}
                        name="arrivalCity"
                        openDropdown={openDropdown}
                        setOpenName={setOpenDropdown}/>
                </View>

                <View style={styles.divide_line} />
                
                <View style={{position: 'relative', marginVertical: 10}}>
                    <View style={{position: 'absolute', left: 20, top: 10, zIndex: 6000}}>
                        <LocationMark />
                    </View>
                    <Dropdown 
                        placeholder={"Все классы авто"} 
                        list={[{label: "Комфорт", value: "комфорт"}]} 
                        currentValue={carType} 
                        setCurrentValue={handleCarTypeChange} 
                        icon={true}
                        dropdownDirection="BOTTOM"
                        zIndex={6002}
                        name="carType"
                        openDropdown={openDropdown}
                        setOpenName={setOpenDropdown}/>
                </View>

                <View style={{position: 'relative', marginVertical: 10}}>
                    <View style={{position: 'absolute', left: 20, top: 10, zIndex: 6000}}>
                        <LocationMark />
                    </View>
                    <Dropdown 
                        placeholder={"По цене"} 
                        list={[{label: "Москва", value: "москва"}]} 
                        currentValue={price} 
                        setCurrentValue={handlePriceChange} 
                        icon={true}
                        dropdownDirection="BOTTOM"
                        zIndex={6001}
                        name="price"
                        openDropdown={openDropdown}
                        setOpenName={setOpenDropdown}/>
                </View>

            </ScrollView>
        </SafeAreaView>
        </>
    )
};

const styles = StyleSheet.create({
    button_inner: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 5
    },
    button_leftSide: {
        flexDirection: 'row',
        alignItems: 'center', 
        columnGap: 10,
    },
    divide_line: {
        width: '80%',
        height: 1,
        backgroundColor: colors.opacity,
        marginHorizontal: '10%',
        marginVertical: 15
    }
})