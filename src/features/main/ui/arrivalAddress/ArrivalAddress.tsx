import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon, LocationMarkIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BottomSheetContext } from "../../context/BottomSheetContext";
import { getCities } from "../../model/main-actions";
import { ArriveAddressMenu } from "./ArrivalAddressMenu";
import { SelectArrivalAddress } from "./SelectArrivalAddress";
import { SelectArrivalCity } from "./SelectArrivalCity";

interface IArrivalAddressProps {
    onClose: () => void;
    city?: string;
    address?: string;
    applyCity: (text: string) => void;
    applyAddress: (text: string) => void;
}

enum ModalStateEnum {
    MENU = 'menu',
    SELECT_CITY = 'select_city',
    SELECT_ADDRESS = 'select_address'
}

type IComponentsByState = {
    [key in ModalStateEnum]: {
        // component: React.JSX.Element,
        component: React.ReactElement,
        snapPoints: string[],
        snapToPosition: string
    }   
}

export const ArrivalAddress: React.FC<IArrivalAddressProps> = ({
    onClose,
    applyCity,
    applyAddress,
    city: defaultCity = "",
    address: defaultAddress = ""
}) => {
    const { modalRef, setSnapPoints } = useContext(BottomSheetContext);

    const [modalState, setModalState] = useState<ModalStateEnum>(ModalStateEnum.MENU);
    const [city, setCity] = useState<string>(defaultCity);
    const [address, setAddress] = useState<string>(defaultAddress);

    const handleApply = () => {
        applyCity(city);
        applyAddress(address);
        onClose();
    }

    const handleChangeModalState = (state: ModalStateEnum, index?: number) => {
        const { snapPoints, snapToPosition } = componentsByState[state];
        if (setSnapPoints) {
            setModalState(state);
            setSnapPoints(snapPoints);
            modalRef?.current?.snapToPosition(snapToPosition);
            modalRef?.current?.snapToPosition(snapToPosition);
            if (index !== undefined) {
                modalRef?.current?.snapToIndex(index);
            }
        }
    };

    const componentsByState: IComponentsByState = {
        [ModalStateEnum.MENU]: {
            component: <ArriveAddressMenu 
                onSelectAddress={() => handleChangeModalState(ModalStateEnum.SELECT_ADDRESS)}
                onSelectCity={() => handleChangeModalState(ModalStateEnum.SELECT_CITY)}
                onApply={handleApply}
                address={address} 
                city={city} 
                onClose={onClose}/>,
            snapPoints: ['42%', '80%'],
            snapToPosition: '42%',
        },
        [ModalStateEnum.SELECT_ADDRESS]: {
            component: <SelectArrivalAddress 
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                setDepartureAddress={(address: string) => {
                    setAddress(address);
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: ['35%', '80%'],
            snapToPosition: '35%',
        },
        [ModalStateEnum.SELECT_CITY]: {
            component: <SelectArrivalCity 
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                debounceCb={getCities} 
                setDepartureCity={(city: string) => {
                    setCity(city);
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: ['35%', '80%'],
            snapToPosition: '35%',
        }
    };

    return componentsByState[modalState].component;
};

const styles = StyleSheet.create({
    
});