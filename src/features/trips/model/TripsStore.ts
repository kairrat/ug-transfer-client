import { createEvent, createStore } from "effector";

interface TripsState {
    data: any[]
};

export const setTrips = createEvent<any[]>();

export const $trips = createStore<TripsState>({
    data: []
})
    .on(setTrips, (state, data) => ({...state, data}))