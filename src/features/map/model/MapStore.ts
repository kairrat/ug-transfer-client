import { createEvent, createStore } from "effector";
import { Location } from "src/features/main/types/address";

type MapState = {
    defaultLocation: Location;
    departureLocation: Location | null;
    arrivalLocation: Location | null;
}

const initialState: MapState = {
    defaultLocation: {
        lat: 55.75333, 
        lon: 37.62176
    },
    departureLocation: null,
    arrivalLocation: null
}

export const setDepartureLocation = createEvent<Location>();
export const setArrivalLocation = createEvent<Location>();

export const $map = createStore<MapState>(initialState)
    .on(setDepartureLocation, (state, departureLocation) => ({...state, departureLocation}))
    .on(setArrivalLocation, (state, arrivalLocation) => ({...state, arrivalLocation}))