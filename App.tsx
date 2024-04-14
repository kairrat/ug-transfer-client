import React, { useEffect } from 'react';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox, Platform, StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import { MainRouter } from './src/routes';
import Orientation from 'react-native-orientation-locker';
import { getFcmToken, registerListenerWithFCM } from 'src/features/firebase';
import { useUnit } from 'effector-react';
import { $profile, updateFcmToken } from 'src/features/profile';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKeys } from 'src/app/types/authorization';

Orientation.lockToPortrait();
LogBox.ignoreAllLogs();

export const App = () => {
  const [{ profile }] = useUnit([$profile]);
  
  const handleConnectSocket = async () => {
    const token = AsyncStorage.getItem(AsyncStorageKeys.TOKEN);
    console.log('token', token)
    const socket = io('http://5.35.89.71:3001', {
        auth: {
          token
        }
    });
    socket.connect();
    socket.on('connect', () => {
      console.log('Socket connected');
    });
    socket.on('disconnect', socket.connect);
  }
  useEffect(() => {
    let unsubscribe;
    if (profile !== null) {      
        handleConnectSocket();

      // Firebase notification fcm token
      getFcmToken().then((token) => {
        if (!profile.fcm_token || profile.fcm_token !== token) {
          updateFcmToken(token)
        }
      });
      unsubscribe = registerListenerWithFCM();
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
      
    } 
  }, [profile]);

  return (
    <SafeAreaProvider style={styles.container}>
      <ToastProvider style={Platform.OS === "ios" && { marginTop: 55 }}>
        <Host>
            <MainRouter />
        </Host>
      {/* @ts-ignore */}
      </ToastProvider>
      <Toast ref={ref => (global['toast'] = ref)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
