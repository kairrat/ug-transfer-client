import { useNavigation } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { StackScreens } from "../../../routes/types/StackScreens";
import { colors, fonts } from "../../../shared/style";
import { FindOrderRouteHeader } from "./FindOrderRouteHeader";
// @ts-ignore
import LocationMark from '@assets/img/LocationMark.svg';
import { Dropdown } from "../../../shared/components/dropdown/Dropdown";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { Datepicker } from "../../../shared/components/datepicker/Datepicker";
import { InputDropdown } from "src/shared/components/InputDropdown";
import { getCities } from "../model/findOrder-actions";


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
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>(null);
    const [] = useState();


    const handleArrivalCityChange = (e: string) => {
        setArrivalCity(e);
    }

    const handleCarTypeChange = (e: string) => {
        setCarType(e);
    }

    const handlePriceChange = (e: string | number) => {
        setPrice(e);
    }

    const handleResetFilter = () => {
        setDepartureCity(null);
        setArrivalCity(null);
        setCarType(null);
        setPrice(null);
        setDate(null);
    }

    const handleSearchDepartureCities =  async () => {
        try {
            const res = await getCities(departureCity);
            console.log('Departure cities: ', res);
            return res;
        } catch (err) {
            console.error('Failed to fetch departure cities', err);
            return [];
        }
    }

    const handleSearchArrivalCities =  async () => {
        try {
            const res = await getCities(departureCity);
            return res;
        } catch (err) {
            console.error('Failed to fetch arrival cities', err);
            return [];
        }
    }
    
    const handleApplyFilter = () => {
        navigation.navigate('Orders');
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
            <View style={{ padding: 10 }}>
                <View style={{position: 'relative', marginVertical: 5}}>
                    <InputDropdown 
                        placeholder="Город отправки"
                        value={departureCity} 
                        setValue={setDepartureCity}
                        leftIcon={<LocationMark width={25}/>}
                        debaunceCb={handleSearchDepartureCities}/>
                </View>
                <View style={{position: 'relative', marginVertical: 5}}>
                    <InputDropdown 
                        placeholder="Город прибытия"
                        value={arrivalCity} 
                        setValue={setArrivalCity}
                        leftIcon={<LocationMark width={25}/>}
                        debaunceCb={handleSearchArrivalCities}/>
                </View>
                {/* <View style={{position: 'relative', marginVertical: 5}}>
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

                <View style={{position: 'relative', marginVertical: 5}}>
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
                </View> */}

                <View style={styles.divide_line} />
                
                <View style={{position: 'relative', marginVertical: 5}}>
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

                <View style={{position: 'relative', marginVertical: 5}}>
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
                <View>
                    <Text style={{color: colors.white, marginTop: 10}}>Время подачи</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Datepicker 
                            placeholder="Укажите дату" 
                            value={date} 
                            onChangeDate={setDate}/>
                        <TouchableOpacity onPress={handleResetFilter}>  
                            <Text style={{textDecorationLine: 'underline',  color: colors.white}}>Очистить фильтр</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[fonts.description, {color: colors.opacity}]}>Выставлено ближайшее время по умолчанию</Text>
                </View>

            </View>
            <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                <PrimaryButton 
                    text="Применить фильтр"
                    onPress={handleApplyFilter}
                />
            </View>
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