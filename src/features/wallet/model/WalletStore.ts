import { createEvent, createStore } from "effector";

interface WalletState {
    amount: number
}

export const setBalance = createEvent<number>();

export const $wallet = createStore<WalletState>({
    amount: 10,
}).on(setBalance, (state, amount) => ({ ...state, amount }));