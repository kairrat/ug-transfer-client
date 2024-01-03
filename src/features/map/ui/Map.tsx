import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useUnit } from "effector-react";
import { $map } from "../model/MapStore";
import { $main, setOrder } from "src/features/main/model/MainStore";
import { CARS_CLASSES } from "src/features/main/constants/constants";


type MapProps = {};


export function Map(props: MapProps) {
    const [{arrivalLocation, departureLocation}] = useUnit([$map]);
    const [{order}, handleSetOrder] = useUnit([$main, setOrder]);
    const [routeDetails, setRouteDetails] = useState({ distance: null, time: null });

    useEffect(() => {
        if (departureLocation) {
            this._webView && this._webView.injectJavaScript(`addStartMarker(${departureLocation.lat}, ${departureLocation.lon})`);
        }
        else {
            this._webView && this._webView.injectJavaScript("removeStartMarker()");
        }
    }, [departureLocation]);

    useEffect(() => {
        if (arrivalLocation) {
            this._webView && this._webView.injectJavaScript(`addEndMarker(${arrivalLocation.lat}, ${arrivalLocation.lon})`);
        }
        else {
            this._webView && this._webView.injectJavaScript("removeEndMarker()");
        }
    }, [arrivalLocation]);

    useEffect(() => {
        if (routeDetails.distance) {
            const carClass = CARS_CLASSES[order.carClass];
            let price = Math.max(routeDetails.distance * carClass.price, 10); // Дистанция умноженная на тариф
            price += parseInt(order.passangersAmount) <= 5 ? 1500 : 2500;
            price += parseInt(order.baggage) <= 5 ? 200 : 500;
            if (order.params.buster) {
                price += 300;
            }
            if (order.params.babyChair) {
                price += 500;
            }
            if (order.params.animalTransfer) {
                price += 400;
            }
            price = Math.ceil(price);
            handleSetOrder({...order, price: price});
        }
        else {
            handleSetOrder({...order, price: null});
        }
    }, [routeDetails]);

    return(
        <View style={styles.container}>
            <WebView 
                ref={c => this._webView = c}
                source={{ html: require('./MapSource')}}
                allowFileAccess={true}
                allowFileAccessFromFileURLs
                allowUniversalAccessFromFileURLs
                allowsProtectedMedia
                onMessage={(e) => {
                    const [messageKey, messageValue] = e.nativeEvent.data.split(":");
                    if (messageKey === "distance") {
                        setRouteDetails(prev => ({...prev, distance: parseFloat(messageValue.replace(',','.'))}));
                    }
                    if (messageKey === "time") {
                        setRouteDetails(prev => ({...prev, time: parseInt(messageValue)}))
                    }
                    if (messageKey === "price" && messageValue === "clear") {
                        setRouteDetails({distance: null, time: null});
                        handleSetOrder({...order, price: null});
                    }
                }}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});