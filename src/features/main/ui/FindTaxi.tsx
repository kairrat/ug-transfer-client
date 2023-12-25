import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Platform, StyleSheet } from "react-native";
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
import { colors } from "src/shared/style";
import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";

interface IFindTaxiProps {
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
        component: React.ReactElement
    }
}



export const FindTaxi: React.FC<IFindTaxiProps> = ({ setLocation, onClearArrivalAddress}) => {
    const { profile } = useUnit($profile);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalState, setModalState] = useState<SheetState>(SheetState.SET_ADDRESS);
    const [snapPoints, setSnapPoints] = useState<(string | number)[]>(Platform.OS === "ios" ? [207, 653] : [177, 623]);
    const sheetModalRef = useRef<BottomSheetModal>(null);
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

    const statesSnapPoints = {
        [SheetState.SET_ADDRESS]: Platform.OS === "ios" ? [197, 653] : [177, 623],
        [SheetState.DEFINED_PAYMENT_METHOD]: Platform.OS === "ios" ? [325] : [295],
        [SheetState.SET_ARRIVAL_ADDRESS]: Platform.OS === "ios" ? [325] : [295],
        [SheetState.SET_DEPARTURE_ADDRESS]: Platform.OS === "ios" ? [325] : [295],
        [SheetState.ORDER_PROCESS]: Platform.OS === "ios" ? [325] : [295],
    }

    const handleChangeModalState = (state: SheetState, index: number = 0) => {
        const points = statesSnapPoints[state]; 
        setModalState(state);
        setSnapPoints(points);
        sheetModalRef.current?.snapToPosition(points[points.length - 1]);
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
        if (address.arrival && address.departure) {
            setDetailsData(prev => ({...prev, price: 2000}))
        }
        else {
            setDetailsData(prev => ({...prev, price: null}))
        }
    }, [address]);

    useEffect(() => {
        handleChangeModalState(modalState);
    }, []);

    const componentsByState: IComponentsByState = {
        [SheetState.DEFINED_PAYMENT_METHOD]: {
            component: <PaymentMethod value={orderParams.paymentMethod} onChange={handleChangePaymentMethod} />,
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
                onEditDetails={() => setDetailsOpen(true)}/>
        },
        [SheetState.SET_ARRIVAL_ADDRESS]: {
            component: <ArrivalAddress 
                setLocation={setLocation}
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(address: string) => setAddress(prev => ({...prev, arrival: { ...prev.arrival, address }}))}
                applyCity={(city: string) => setAddress(prev => ({...prev, arrival: { ...prev.arrival, city }}))}
                defaultAddress={address.arrival}/>
        },
        [SheetState.SET_DEPARTURE_ADDRESS]: {
            component: <DepartureAddress 
                setLocation={setLocation}
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(address: string) => setAddress(prev => ({...prev, departure: { ...prev.departure, address }}))}
                applyCity={(city: string) => setAddress(prev => ({...prev, departure: { ...prev.departure, city }}))}
                defaultAddress={address.departure}/>
        },
        [SheetState.ORDER_PROCESS]: {
            component: <OrderProcess 
                status={orderStatus} 
                onReceivedDismiss={() => setOrderStatus("seeking")} 
                onSeekingDismiss={() => handleChangeModalState(SheetState.SET_ADDRESS)}/>
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
            
            <BottomSheet
                ref={sheetModalRef}
                index={1}
                snapPoints={statesSnapPoints[modalState]}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetHandleIndicator}
                // enableContentPanningGesture={sheetModalResizing.content}
                // enableHandlePanningGesture={sheetModalResizing.handle}
                enableContentPanningGesture={false}
                enableHandlePanningGesture={true}
                onChange={(e) => {
                    e === -1 && sheetModalRef.current?.snapToIndex(0);
                    console.log( e);
                }}>
                    {
                        componentsByState[modalState].component
                    }
                </BottomSheet>
        </BottomSheetContext.Provider>
    );
};

const styles = StyleSheet.create({
    bottomSheetBackground: {
        backgroundColor: colors.background
    },
    bottomSheetHandleIndicator: {
        width: '10%',
        backgroundColor: colors.opacity
    }
});