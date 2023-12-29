import React, { useEffect } from 'react';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import { MainRouter } from './src/routes';
import Orientation from 'react-native-orientation-locker';
import { getFcmToken, registerListenerWithFCM } from 'src/features/firebase';

Orientation.lockToPortrait();

export const App = () => {
  useEffect(() => {
    getFcmToken();
  }, []);

  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);
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
