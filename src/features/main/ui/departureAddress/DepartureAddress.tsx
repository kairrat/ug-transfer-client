import React, { useContext, useEffect, useState } from "react";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { BottomSheetContext } from "../../context/BottomSheetContext";
import { getCities } from "../../model/main-actions";
import { DepartureAddressMenu } from "./DepartureAddressMenu";
import { SelectDepartureAddress } from "./SelectDepartureAddress";
import { SelectDepartureCity } from "./SelectDepartureCity";
import { IAddress } from "../../types/findTaxiSchemas";
import { getGeocode } from "src/features/map/model/map-actions";
import { getModalHeight } from "../../model/modalHeightHelper";

interface IDepartureAddressProps {
    defaultAddress: IAddress;
    onClose: () => void;
    applyCity: (text: string) => void;
    applyAddress: (text: string) => void;
    setLocation: (location: any) => void;
}

enum ModalStateEnum {
    MENU = 'menu',
    SELECT_CITY = 'select_city',
    SELECT_ADDRESS = 'select_address'
}

type IComponentsByState = {
    [key in ModalStateEnum]: {
        component: React.ReactElement,
        snapPoints: (string | number)[],
        snapToPosition: string | number
    }   
}

export const DepartureAddress: React.FC<IDepartureAddressProps> = ({
    defaultAddress,
    onClose,
    applyCity,
    applyAddress,
    setLocation
}) => {
    const { modalRef, setSnapPoints } = useContext(BottomSheetContext);
    const isKeyboardVisible = useKeyboardVisibility();
    const [modalState, setModalState] = useState<ModalStateEnum>(ModalStateEnum.MENU);
    const [address, setAddress] = useState(defaultAddress);

    const handleApply = () => {
        applyCity(address.city);
        applyAddress(address.address);
        onClose();
    }

    const handleChangeModalState = (state: ModalStateEnum, index?: number) => {
        const { snapPoints, snapToPosition } = componentsByState[state];
        if (setSnapPoints) {
            setModalState(state);
            setSnapPoints(snapPoints);
            modalRef.current?.snapToPosition(snapToPosition);
            if (index !== undefined) {
                modalRef?.current?.snapToIndex(index);
            }
        }
    };

    useEffect(() => {
        if (address.city && address.address) {
            getGeocode(`${address.city},${address.address}`).then((res: any) => {
                const points = res.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos;
                if (points) {
                    const lat = parseFloat(points.split(' ')[1]);
                    const lon = parseFloat(points.split(' ')[0]);
                    setLocation(prev => ({...prev, departure: { lon, lat }}));
                }
            }).catch(err => console.error('Failed to get geocode of departure address: ', err))
        }
    }, [address.address]);

    const componentsByState: IComponentsByState = {
        [ModalStateEnum.MENU]: {
            component: <DepartureAddressMenu 
                address={address.address} 
                city={address.city} 
                onApply={handleApply} 
                onClose={onClose}
                onSelectCity={() => handleChangeModalState(ModalStateEnum.SELECT_CITY, 0)}
                onSelectAddress={() => handleChangeModalState(ModalStateEnum.SELECT_ADDRESS, 0)}/>,
            snapPoints: getModalHeight([295]) as number[],
            snapToPosition: getModalHeight(295) as number,
        },
        [ModalStateEnum.SELECT_ADDRESS]: {
            component: <SelectDepartureAddress 
                snapPosition={getModalHeight(255) as number}
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                setDepartureAddress={(selectedAddress: string) => {
                    setAddress(prev => ({...prev, address: selectedAddress}));
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: getModalHeight([255]) as number[],
            snapToPosition: getModalHeight(255) as number,
        },
        [ModalStateEnum.SELECT_CITY]: {
            component: <SelectDepartureCity 
                snapPosition={getModalHeight(255) as number}
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                debounceCb={getCities} 
                setDepartureCity={(selectedCity: string) => {
                    setAddress(prev => ({...prev, city: selectedCity}))
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: ([255]) as number[],
            snapToPosition: getModalHeight(255) as number,
        }
    }

    return componentsByState[modalState].component;
};