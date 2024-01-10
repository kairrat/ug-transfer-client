import { createEvent, createStore } from "effector";

type GpsState = {
    gpsEnabled: boolean;
    lon: null | number;
    lat: null | number;
    setMyLocationTrigger: boolean;
}

export const setGpsEnabled = createEvent<boolean>();
export const setCurrentLocation = createEvent<{lon: number, lat: number}>();
export const setMyLocationTrigger = createEvent<boolean>();

export const $gps = createStore<GpsState>({ gpsEnabled: false, lon: null, lat: null, setMyLocationTrigger: false })
    .on(setGpsEnabled, (state, gpsEnabled) => ({...state, gpsEnabled}))
    .on(setCurrentLocation, (state, {lon, lat}) => ({...state, lon, lat}))
    .on(setMyLocationTrigger, (state, setMyLocationTrigger) => ({...state, setMyLocationTrigger}));