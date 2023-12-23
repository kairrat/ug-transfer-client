import React, { useContext, useEffect, useState } from "react";
import { useKeyboardVisibility } from "src/features/useKeyboardVisibility";
import { BottomSheetContext } from "../../context/BottomSheetContext";
import { getCities } from "../../model/main-actions";
import { ArriveAddressMenu } from "./ArrivalAddressMenu";
import { SelectArrivalAddress } from "./SelectArrivalAddress";
import { SelectArrivalCity } from "./SelectArrivalCity";
import { IAddress } from "../../types/findTaxiSchemas";
import { getGeocode } from "src/features/map/model/map-actions";

interface IArrivalAddressProps {
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
        snapPoints: number[],
        snapToPosition: number
    }   
}

export const ArrivalAddress: React.FC<IArrivalAddressProps> = ({
    onClose,
    applyCity,
    applyAddress,
    setLocation,
    defaultAddress
}) => {
    const { modalRef, setSnapPoints } = useContext(BottomSheetContext);
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
            modalRef?.current?.snapToPosition(snapToPosition);
            modalRef?.current?.snapToPosition(snapToPosition);
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
                    console.log('Setting arrival location: ', lat, lon);
                    setLocation(prev => ({...prev, arrival: { lon, lat }}));
                }
            }).catch(err => console.error('Failed to get geocode of arrival address: ', err))
        }
    }, [address.address]);

    const componentsByState: IComponentsByState = {
        [ModalStateEnum.MENU]: {
            component: <ArriveAddressMenu 
                onSelectAddress={() => handleChangeModalState(ModalStateEnum.SELECT_ADDRESS)}
                onSelectCity={() => handleChangeModalState(ModalStateEnum.SELECT_CITY)}
                onApply={handleApply}
                address={address.address}
                city={address.city} 
                onClose={onClose}/>,
            snapPoints: [295],
            snapToPosition: 295,
        },
        [ModalStateEnum.SELECT_ADDRESS]: {
            component: <SelectArrivalAddress 
                snapPosition={255}
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)} 
                setDepartureAddress={(address: string) => {
                    setAddress(prev => ({...prev, address}));
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: [260],
            snapToPosition: 260,
        },
        [ModalStateEnum.SELECT_CITY]: {
            component: <SelectArrivalCity 
                snapPosition={255}
                onClose={() => handleChangeModalState(ModalStateEnum.MENU)}
                debounceCb={getCities} 
                setDepartureCity={(city: string) => {
                    setAddress(prev => ({...prev, city}))
                    handleChangeModalState(ModalStateEnum.MENU);
                }}/>,
            snapPoints: [260],
            snapToPosition: 260,
        }
    };

    

    return componentsByState[modalState].component;
};