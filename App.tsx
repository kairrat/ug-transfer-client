import React from 'react';
import Toast from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {Host} from 'react-native-portalize';
import {MainRouter} from './src/routes/MainRouter';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
const Stack = createStackNavigator();
export const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
        <Host>
            <MainRouter />
        </Host>
      {/* @ts-ignore */}
      <Toast ref={ref => (global['toast'] = ref)} />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
