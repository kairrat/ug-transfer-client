import { walletApi } from "./WalletApi";

export const getBalance =  async () => {
    const { data } = await walletApi.getBalance();
    return data;
}