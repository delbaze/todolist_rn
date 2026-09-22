import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Platform } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderProvider from './contexts/LoaderContext';

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Todos App' })
  .useReactNative()
  .connect();

export default function App() {
// console.log(Platform.Version)
  // syntaxe JSX
  
  return ( 
    <SafeAreaProvider>
      <LoaderProvider>
        <MainNavigator />
        <StatusBar style="auto" />
      </LoaderProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
