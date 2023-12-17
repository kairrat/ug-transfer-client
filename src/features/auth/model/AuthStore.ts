import { createEvent, createStore } from "effector";
import { Profile } from 'src/shared/types/profile';

interface AuthState {
    isLogged: boolean;
    code: string;
    phone: string;
    profile: Profile | null;
}

export const setLoggedState = createEvent<boolean>();
export const setAuthCode = createEvent<string>();
export const setAuthPhone = createEvent<string>();
export const setProfile = createEvent<Profile>();

export const $auth = createStore<AuthState>({
    isLogged: false,
    code: "",
    phone: "+996997129102",
    profile: null
})
    .on(setLoggedState, (state, isLogged) => ({...state, isLogged}))
    .on(setAuthCode, (state, code) => ({...state, code}))
    .on(setAuthPhone, (state, phone) => ({...state, phone}))
    .on(setProfile, (state, profile) => ({...state, profile}))
