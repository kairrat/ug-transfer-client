import React, { memo, useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import WebView from "react-native-webview";
import { useUnit } from "effector-react";
import { $map } from "../model/MapStore";
import { $main, setOrder } from "src/features/main/model/MainStore";
import { CARS_CLASSES } from "src/features/main/constants/constants";
import { $gps, setMyLocationTrigger as triggerMyPosition } from "src/features/gps";

function Map(){
    const [{arrivalLocation, departureLocation}] = useUnit([$map]);
    const [{order}, handleSetOrder] = useUnit([$main, setOrder]);
    const [{setMyLocationTrigger, lat: myLat, lon: myLon}, handleSetMyPosition] = useUnit([$gps, triggerMyPosition]);
    const [routeDetails, setRouteDetails] = useState({ distance: null, time: null });
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
    const [firstLocationLoad, setFirstLocationLoad] = useState<boolean>(false);

    useEffect(() => {
        if (this._webView && mapLoaded) {
            if (departureLocation) {
                this._webView.injectJavaScript(`addStartMarker(${departureLocation.lat}, ${departureLocation.lon})`);
            }
            else {
                this._webView.injectJavaScript("removeStartMarker()");
            }
        }
    }, [departureLocation]);

    useEffect(() => {
        if (this._webView && mapLoaded) {
            if (arrivalLocation) {
                this._webView.injectJavaScript(`addEndMarker(${arrivalLocation.lat}, ${arrivalLocation.lon})`);
            }
            else {
                this._webView.injectJavaScript("removeEndMarker()");
            }
        }
    }, [arrivalLocation]);
    useEffect(() => {
        if (routeDetails.distance) {
            const carClass = CARS_CLASSES[order.carClass];  
            let price = Math.max(routeDetails.distance * carClass.price, 10); // Дистанция умноженная на тариф
            if (order.passangersAmount === "") {
                price += 1500;
            }
            else {
                price += parseInt(order.passangersAmount) <= 5 ? 1500 : 2500;
            }
            if (order.baggage === "") {
                price += 200;    
            }
            else {
                price += parseInt(order.baggage) <= 5 ? 200 : 500;
            }
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
    }, [routeDetails, order.params, order.carClass, order.passangersAmount, order.baggage]);

    useEffect(() => {
        if (setMyLocationTrigger) {
            if (this._webView) {
                this._webView.injectJavaScript('setMyPosition()');
            }
            handleSetMyPosition(false);
        }
    }, [setMyLocationTrigger]);

    useEffect(() => {
        if (!firstLocationLoad && myLon !== null && myLat !== null && mapLoaded) {
            this._webView.injectJavaScript(`addMyLocation(${myLat}, ${myLon}); setMyPosition()`);
            setFirstLocationLoad(true);
        }
        if (myLat !== null && myLon !== null && this._webView && mapLoaded) {
            this._webView.injectJavaScript(`addMyLocation(${myLat}, ${myLon})`);
        }
    }, [myLat, myLon, mapLoaded, firstLocationLoad]);

    useEffect(() => {

    }, []);

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
                    if (messageKey === "map") {
                        setMapLoaded(true);
                    }
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

export default memo(Map);

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});