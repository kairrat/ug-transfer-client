import { createEvent, createStore } from "effector";

type GpsState = {
    gpsEnabled: boolean;
}

export const setGpsEnabled = createEvent<boolean>();

export const $gps = createStore<GpsState>({ gpsEnabled: false })
    .on(setGpsEnabled, (state, gpsEnabled) => ({...state, gpsEnabled}));