import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackScreens } from "../../../routes/types/StackScreens";
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "@styles";
import { DrawerActions } from "@react-navigation/native";
import { $wallet, BalanceContainer, getBalance } from "../../../features/wallet";
import { WalletHeader } from "../../../features/wallet";
import { WithdrawInput } from '../../../features/wallet';
import { PrimaryButton } from "../../../shared/components/button/PrimaryButton";
import { useEvent, useStore } from "effector-react";
import { ScreenHeader } from "../../../shared/components";
import { setBalance } from "src/features/wallet/model/WalletStore";
// @ts-ignore
import Logo from '@assets/img/logo.png';


type CompProps = NativeStackScreenProps<StackScreens, "Wallet">;

export const Wallet: React.FC<CompProps> = function Wallet({
  navigation,
  route,
}) {
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const { amount } = useStore($wallet);

  const handleMoveBack = () => {
    navigation.goBack();
  }

  const handleWithdrawAmountChange = (value: string) => {
    setWithdrawAmount(value.replace(/[^0-9]/g, ''));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'space-between' }}>
      <ScreenHeader title="Баланс" onLeftButtonPress={handleMoveBack}/>
        <View style={styles.content}>
          <View style={styles.image_container}>
            <Image 
              source={Logo}
              style={styles.logo_img}/>
          </View>
          <BalanceContainer amount={amount}/>
          <WithdrawInput value={withdrawAmount} onChange={handleWithdrawAmountChange}/>
          <PrimaryButton
            onPress={() => {}}
            text="Пополнить баланс"
            containerStyle={{ paddingVertical: 3 }}/>
          <View style={styles.description_holder}>
            <Text style={styles.description}>Чтобы брать заказы, нужно заранее забронировать коммисию.</Text>
            <Text style={styles.description}>В случае Отмены заказа, деньги вернуться Вам на счет</Text>
          </View>
        </View>
      <View />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  header_title: {
    color: colors.white
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    rowGap: 15
  },
  image_container: {
    maxWidth: '60%',
    objectFit: 'contain',
  },
  logo_img: {
    maxWidth: '100%', 
    objectFit: 'contain'
  },
  description_holder: {
    width: '100%',
    alignItems: 'center'
  },
  description: {
    width: '90%',
    color: colors.white,
    textAlign: 'center',
  }
});