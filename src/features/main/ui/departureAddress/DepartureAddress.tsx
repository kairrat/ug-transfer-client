import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "src/shared/components/Button";
import { Input } from "src/shared/components/Input";
import { BuildingIcon, CrossIcon, LocationMarkIcon } from "src/shared/img";
import { colors, fonts } from "src/shared/style";
import { BottomSheetContext } from "../../context/BottomSheetContext";
import { getCities } from "../../model/main-actions";
import { DepartureAddressMenu } from "./DepartureAddressMenu";
import { SelectDepartureAddress } from "./SelectDepartureAddress";
import { SelectDepartureCity } from "./SelectDepartureCity";

interface IDepartureAddressProps {
    city?: string;
    address?: string;
    onClose: () => void;
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

export const DepartureAddress: React.FC<IDepartureAddressProps> = ({
    city: defaultCity = "",
    address: defaultAddress = "",
    onClose,
    applyCity,
    applyAddress
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
        console.log(state);
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
            component: <DepartureAddressMenu 
                address={address} 
                city={city} 
                onApply={handleApply} 
                onClose={onClose}
                onSelectCity={() => handleChangeModalState(ModalStateEnum.SELECT_CITY)}
                onSelectAddress={() => handleChangeModalState(ModalStateEnum.SELECT_ADDRESS)}/>,
            snapPoints: ['42%', '80%'],
            snapToPosition: '42%',
        },
        [ModalStateEnum.SELECT_ADDRESS]: {
            component: <SelectDepartureAddress 
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                setDepartureAddress={(selectedAddress: string) => {
                    setAddress(selectedAddress);
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: ['35%', '80%'],
            snapToPosition: '35%',
        },
        [ModalStateEnum.SELECT_CITY]: {
            component: <SelectDepartureCity 
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                debounceCb={getCities} 
                setDepartureCity={(selectedCity: string) => {
                    setCity(selectedCity);
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: ['35%', '80%'],
            snapToPosition: '35%',
        }
    }

    return componentsByState[modalState].component;
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    container_header: {
    },
    header_title: {
        width: '100%',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
        marginVertical: 5
    },
    close_button: {
        backgroundColor: colors.opacity,
        borderRadius: 12,
        padding: 8,
        position: 'absolute',
        left: 0,
        zIndex: 1
    },
    button_text: {
        fontSize: 16,
        color: colors.white
    },
    container_body: {
        marginVertical: 35,
        flexDirection: 'column',
        rowGap: 10
    },
    buttons_holder: {

    },
    apply_button_text: {
        textAlign: 'center',
        color: colors.black,
        fontSize: 16
    }
});