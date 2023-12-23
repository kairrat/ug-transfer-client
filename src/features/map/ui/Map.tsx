import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Location } from "../../main/types/address";
import WebView from "react-native-webview";

type DepartureLocation = {
    departure: Location
    arrival: null,
    default: Location
}

type ArrivalLocation = {
    departure: null
    arrival: Location,
    default: Location
}

type CompleteLocation = {
    departure: Location
    arrival: Location,
    default: Location
}
interface IMapProps {
    location: DepartureLocation | ArrivalLocation | CompleteLocation,
    setPrice: (distance: number, duration?: number) => void;
    clearPrice: () => void;
}

const ROUTES_MOCK = [

]


export function Map({ location, setPrice, clearPrice }: IMapProps) {
    const webViewRef = useRef(null);
    const [routes, setRoutes] = useState([]);
    const [locationRoutes, setLocationRoutes] = useState([]);
    const [routeDetails, setRouteDetails] = useState({ distance: null, time: null });

    useEffect(() => {
        if (location.departure) {
            this._webView && this._webView.injectJavaScript(`addStartMarker(${location.departure.lat}, ${location.departure.lon})`);
        }
        else {
            this._webView && this._webView.injectJavaScript("removeStartMarker()");
        }
    }, [location.departure]);

    useEffect(() => {
        if (location.arrival) {
            this._webView && this._webView.injectJavaScript(`addEndMarker(${location.arrival.lat}, ${location.arrival.lon})`);
        }
        else {
            this._webView && this._webView.injectJavaScript("removeEndMarker()");
        }
    }, [location.arrival]);

    useEffect(() => {
        if (routeDetails.distance && routeDetails.time) {
            setPrice(routeDetails.distance, routeDetails.time);
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
                        console.log("Distance: ", messageValue, parseFloat(messageValue.replace(',','.')));
                        setRouteDetails(prev => ({...prev, distance: parseFloat(messageValue.replace(',','.'))}));
                    }
                    if (messageKey === "time") {
                        console.log("Duration: ", messageValue, parseInt(messageValue));
                        setRouteDetails(prev => ({...prev, time: parseInt(messageValue)}))
                    }
                    if (messageKey === "price" && messageValue === "clear") {
                        setRouteDetails({distance: null, time: null});
                        clearPrice();
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