import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useEffect, useState } from "react";
import { Modal, Platform } from "react-native";
import { CARS_CLASSES, PAYMENT_METHODS } from "../model/constants";
import { IAddress } from "../types/findTaxiSchemas";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";
import { ArrivalAddress } from "./arrivalAddress/ArrivalAddress";
import { DepartureAddress } from "./departureAddress/DepartureAddress";
import { PaymentMethod } from "./PaymentMethod";
import { SetAddress } from "./SetAddress";
import { BottomSheetContext } from "../context/BottomSheetContext";
import { Details } from "./Details";
import { OrderParams } from "../types/order";
import {  Order} from 'src/types/order';
import { OrderProcess } from "./OrderProcess";
import dayjs from 'dayjs';
import { useUnit } from "effector-react";
import { $profile } from "src/features/profile";
import { getModalHeight } from "../model/modalHeightHelper";

interface IFindTaxiProps {
    sheetModalRef: React.RefObject<BottomSheetModalMethods>,
    setSnapPoints: (newState: (string | number)[]) => void;
    setLocation: (location: any) => void;
    onClearArrivalAddress: () => void;
}

enum SheetState {
    SET_ADDRESS = 'set_address',
    DEFINED_PAYMENT_METHOD = 'define_payment_method',
    SET_DEPARTURE_ADDRESS = 'set_departure_address',
    SET_ARRIVAL_ADDRESS = 'set_arrival_address',
    ORDER_PROCESS = 'order_process'
}

type IComponentsByState = {
    [key in SheetState]: {
        component: React.ReactElement,
        snapPoints: (string | number)[],
        snapToPosition: string | number
    }
}



export const FindTaxi: React.FC<IFindTaxiProps> = ({sheetModalRef, setSnapPoints, setLocation, onClearArrivalAddress}) => {
    const { profile } = useUnit($profile);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalState, setModalState] = useState<SheetState>(SheetState.SET_ADDRESS);
    const [address, setAddress] = useState<{ departure: IAddress, arrival: IAddress }>({
        departure: { city: "", address: "" },
        arrival: { city: "", address: "" }
    });
    const [orderParams, setOrderParams] = useState<OrderParams>({
        activeCarClass: 0,
        shipDate: new Date(),
        paymentMethod: PaymentMethodEnum.CASH,
    });
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
    const [detailsData, setDetailsData] = useState({ 
        baggage: "", 
        passangersAmount: "", 
        options: {
            babyChair: false,
            buster: false,
            animalTransfer: false
        },
        comment: "",
        price: null
    });
    const [orderStatus, setOrderStatus] = useState<'received' | 'seeking' | null>(null);

    const handleChangePaymentMethod = (method: PaymentMethodEnum) => {
        setOrderParams(prev => ({...prev, paymentMethod: method}));
        handleChangeModalState(SheetState.SET_ADDRESS)
    }

    const handleChangeModalState = (state: SheetState, index: number = 0) => {
        const { snapPoints, snapToPosition} = componentsByState[state];
        setModalState(state);
        setSnapPoints(snapPoints);
        sheetModalRef.current?.snapToPosition(snapToPosition);
        console.log('Setting position');
        // sheetModalRef.current?.snapToIndex(index);
    }

    const handleApplyDetails = (details: any) => {
        setDetailsData(details);
        setDetailsOpen(false);
    }

    const handleFindTaxi = () => {
        setOrderStatus("received");
        handleChangeModalState(SheetState.ORDER_PROCESS);
    }

    const handleClearArrivalAddress = () => {
        onClearArrivalAddress();
        setAddress(prev => ({...prev, arrival: {city: "", address: ""}}));
    }

    useEffect(() => {
        const { snapPoints, snapToPosition} = componentsByState[modalState];
        setSnapPoints(snapPoints);
        console.log('Snap points: ', snapPoints);
        console.log('Snap position: ', snapToPosition);
        sheetModalRef.current?.snapToPosition(snapToPosition);
    }, []);

    useEffect(() => {
        if (address.arrival && address.departure) {
            setDetailsData(prev => ({...prev, price: 2000}))
        }
        else {
            setDetailsData(prev => ({...prev, price: null}))
        }
    }, [address]);

    console.log(modalState);

    const componentsByState: IComponentsByState = {
        [SheetState.DEFINED_PAYMENT_METHOD]: {
            component: <PaymentMethod value={orderParams.paymentMethod} onChange={handleChangePaymentMethod} />,
            snapPoints: getModalHeight([295]) as (number | string)[],
            snapToPosition: getModalHeight('22%') as string,
        },
        [SheetState.SET_ADDRESS]: {
            component: <SetAddress
                address={address}
                paymentIcon={PAYMENT_METHODS[orderParams.paymentMethod].Icon}
                orderParams={orderParams}
                orderPrice={detailsData.price}
                setOrderParams={setOrderParams}
                findTaxi={handleFindTaxi}
                onPaymentPress={() => handleChangeModalState(SheetState.DEFINED_PAYMENT_METHOD)}
                onDepartureAddressEdit={() => handleChangeModalState(SheetState.SET_DEPARTURE_ADDRESS)}
                onArrivalAddressEdit={() => handleChangeModalState(SheetState.SET_ARRIVAL_ADDRESS)}
                onClearArriveAddress={handleClearArrivalAddress}
                onEditDetails={() => setDetailsOpen(true)}/>,
            snapPoints: getModalHeight([177, 623]) as (number | string)[],
            snapToPosition: getModalHeight(623) as number,
        },
        [SheetState.SET_ARRIVAL_ADDRESS]: {
            component: <ArrivalAddress 
                setLocation={setLocation}
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(address: string) => setAddress(prev => ({...prev, arrival: { ...prev.arrival, address }}))}
                applyCity={(city: string) => setAddress(prev => ({...prev, arrival: { ...prev.arrival, city }}))}
                defaultAddress={address.arrival}/>,
            snapPoints: getModalHeight([295]) as (number | string)[],
            snapToPosition: getModalHeight(295) as number,
        },
        [SheetState.SET_DEPARTURE_ADDRESS]: {
            component: <DepartureAddress 
                setLocation={setLocation}
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(address: string) => setAddress(prev => ({...prev, departure: { ...prev.departure, address }}))}
                applyCity={(city: string) => setAddress(prev => ({...prev, departure: { ...prev.departure, city }}))}
                defaultAddress={address.departure}/>,
            snapPoints: getModalHeight([295]) as (number | string)[],
            snapToPosition: getModalHeight(295) as number,
        },
        [SheetState.ORDER_PROCESS]: {
            component: <OrderProcess 
                status={orderStatus} 
                onReceivedDismiss={() => setOrderStatus("seeking")} 
                onSeekingDismiss={() => handleChangeModalState(SheetState.SET_ADDRESS)}/>,
            snapPoints: getModalHeight([295]) as (number | string)[],
            snapToPosition: getModalHeight(192) as number
        }
    }

    return(
        <BottomSheetContext.Provider value={{
            modalRef: sheetModalRef,
            setSnapPoints: setSnapPoints
        }}>
            <Modal

                visible={detailsOpen} 
                children={<Details 
                    onApply={handleApplyDetails} 
                    onClose={() => setDetailsOpen(false)}
                    defaultBaggage={detailsData.baggage}
                    defaultPassangersAmount={detailsData.passangersAmount}
                    defaultOptions={detailsData.options}
                    defaultComment={detailsData.comment}/>}
                />
            {
                componentsByState[modalState].component
            }
        </BottomSheetContext.Provider>
    );
};
