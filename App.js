import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderProvider from './contexts/LoaderContext';
import SettingsProvider from './contexts/SettingsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginScreen from './screens/LoginScreen';
import { useState } from 'react';
import Loader from './components/Loader';
import { useAuthStore } from './store/authStore';

Reactotron
  .setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Todos App' })
  .useReactNative()
  .connect();


const queryClient = new QueryClient();

export default function App() {

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  if (!hasHydrated){
    return <Loader />
  }
  return ( 
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <SettingsProvider>
          <LoaderProvider>
            {isAuthenticated ? <MainNavigator /> : <LoginScreen />}
            <StatusBar style="auto" />
          </LoaderProvider>
        </SettingsProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
});
