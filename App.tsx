import React from 'react';
import Toast, { ToastProvider } from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Platform, StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import { MainRouter } from './src/routes';
import {createStackNavigator} from "@react-navigation/stack";
const Stack = createStackNavigator();
export const App = () => {
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
