import { createEvent, createStore } from "effector";

interface WalletState {
    amount: number
}

export const $wallet = createStore<WalletState>({
    amount: 10,
  })
  