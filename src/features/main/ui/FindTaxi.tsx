import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useMemo, useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { colors } from "src/shared/style";
import { PAYMENT_METHODS } from "../model/constants";
import { IAddress } from "../types/findTaxiSchemas";
import { PaymentMethodEnum } from "../types/paymentMethod.enum";
import { ArrivalAddress } from "./arrivalAddress/ArrivalAddress";
import { DepartureAddress } from "./departureAddress/DepartureAddress";
import { PaymentMethod } from "./PaymentMethod";
import { SetAddress } from "./SetAddress";
import { BottomSheetContext } from "../context/BottomSheetContext";
import { Details } from "./Details";
import { Portal } from "@gorhom/portal";

interface IFindTaxiProps {
    sheetModalRef: React.RefObject<BottomSheetModalMethods>,
    setSnapPoints: (newState: string[]) => void;
}

enum SheetState {
    SET_ADDRESS = 'set_address',
    DEFINED_PAYMENT_METHOD = 'define_payment_method',
    SET_DEPARTURE_ADDRESS = 'set_departure_address',
    SET_ARRIVAL_ADDRESS = 'set_arrival_address'
}

type IComponentsByState = {
    [key in SheetState]: {
        // component: React.JSX.Element,
        component: React.ReactElement,
        snapPoints: string[],
        snapToPosition: string
    }
}

export const FindTaxi: React.FC<IFindTaxiProps> = ({sheetModalRef, setSnapPoints}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [modalState, setModalState] = useState<SheetState>(SheetState.SET_ADDRESS);
    const [departureAddress, setDepartureAddress] = useState<IAddress>({ city: "", address: "" });
    const [arrivalAddress, setArrivalAddress] = useState<IAddress>({ city: "", address: "" });
    const [activeCarClass, setActiveCarClass] = useState<number>(0);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethodEnum>(PaymentMethodEnum.CASH);
    const [shipDate, setShipDate] = useState(new Date());
    const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
    const [detailsData, setDetailsData] = useState({ 
        baggage: "", 
        passangersAmount: "", 
        options: {
            babyChair: false,
            buster: false,
            animalTransfer: false
        },
        comment: ""
    });


    const handleChangePaymentMethod = (method: PaymentMethodEnum) => {
        setPaymentMethod(method);
        handleChangeModalState(SheetState.SET_ADDRESS)
    }

    const handleChangeModalState = (state: SheetState, index: number = 0) => {
        const { snapPoints, snapToPosition} = componentsByState[state];
        setModalState(state);
        setSnapPoints(snapPoints);
        sheetModalRef.current?.snapToPosition(snapToPosition);
        sheetModalRef.current?.snapToIndex(index);
    }

    const handleApplyDetails = (details: any) => {
        setDetailsData(details);
        setDetailsOpen(false);
    }
    

    const componentsByState: IComponentsByState = useMemo(() => ({
        [SheetState.DEFINED_PAYMENT_METHOD]: {
            component: <PaymentMethod value={paymentMethod} onChange={handleChangePaymentMethod} />,
            snapPoints: ['22%'],
            snapToPosition: '22%',
        },
        [SheetState.SET_ADDRESS]: {
            component: <SetAddress 
                departureAddress={departureAddress}
                arrivalAddress={arrivalAddress}
                paymentMethod={paymentMethod || PaymentMethodEnum.CASH}
                PaymentIcon={PAYMENT_METHODS[paymentMethod || PaymentMethodEnum.CASH].Icon}
                activeCarClass={activeCarClass} 
                shipDate={shipDate}
                setActiveCarClass={setActiveCarClass} 
                setDepartureAddress={setDepartureAddress}
                onPaymentPress={() => handleChangeModalState(SheetState.DEFINED_PAYMENT_METHOD)}
                setShipDate={setShipDate}
                onDepartureAddressEdit={() => handleChangeModalState(SheetState.SET_DEPARTURE_ADDRESS)}
                onArrivalAddressEdit={() => handleChangeModalState(SheetState.SET_ARRIVAL_ADDRESS)}
                onClearArriveAddress={() => setArrivalAddress({city: "", address: ""})}
                onEditDetails={() => setDetailsOpen(true)}/>,
            snapPoints: ['25%', '83%'],
            snapToPosition: '83%',
        },
        [SheetState.SET_ARRIVAL_ADDRESS]: {
            component: <ArrivalAddress 
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(selectedAddress: string) => setArrivalAddress(prev => ({...prev, address: selectedAddress}))}
                applyCity={(selectedCity: string) => setArrivalAddress(prev => ({...prev, city: selectedCity}))}
                address={arrivalAddress.address}
                city={arrivalAddress.city}/>,
            snapPoints: ['40%'],
            snapToPosition: '40%',
        },
        [SheetState.SET_DEPARTURE_ADDRESS]: {
            component: <DepartureAddress 
                onClose={() => handleChangeModalState(SheetState.SET_ADDRESS)}
                applyAddress={(selectedAddress: string) => setDepartureAddress(prev => ({...prev, address: selectedAddress}))}
                applyCity={(selectedCity: string) => setDepartureAddress(prev => ({...prev, city: selectedCity}))}
                city={departureAddress.city}
                address={departureAddress.address}/>,
            snapPoints: ['40%'],
            snapToPosition: '40%',
        },
    }), [departureAddress, arrivalAddress]);

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

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    address_holder: {
        flexDirection: 'column',
        rowGap: 10,
        marginVertical: 20
    },
    carOptions_holder: {

    },
    carOption_title: {
        color: colors.white,
        fontSize: 16
    },
    carClass_list: {
        columnGap: 10
    },
    carClass_item: {
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'transparent'
    },
    activeCarClass: {
        borderColor: colors.stroke,
    },
    carClass_img: {
        width: 100,
        height: 50,
        objectFit: "contain"
    },
    carClass_text: {
        color: colors.white,
        textAlign: 'center'
    }
});