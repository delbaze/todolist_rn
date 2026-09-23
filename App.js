import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderProvider from './contexts/LoaderContext';
import SettingsProvider from './contexts/SettingsContext';

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Todos App' })
  .useReactNative()
  .connect();

export default function App() {
  return ( 
    <SafeAreaProvider>
      <SettingsProvider>
        <LoaderProvider>
          <MainNavigator />
          <StatusBar style="auto" />
        </LoaderProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
