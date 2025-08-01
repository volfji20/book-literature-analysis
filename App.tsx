import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DescriptionScreen from './src/screens/Description';
import 'react-native-gesture-handler';
import LibraryScreen from './src/screens/LibraryScreen';
import Settings from './src/screens/SettingsScreen';
import SplashScreen from './src/screens/SplashScreen';

import { LogBox, Platform } from 'react-native';
import BottomNavigation from './src/navigation/BottomNavigation';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {

  const [showSplashScreen, setShowSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplashScreen(false);
    }, 1000);

    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: 'appl_iRsmpnfqlUkBbNRxJIlcotFazLw' });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: 'goog_TKMGEtQuKcggTByukyxsmQSSXjw' });
    }
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          {showSplashScreen ? (
            <SplashScreen />
          ) : (
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="BottomNavigation"
                  component={BottomNavigation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Description"
                  component={DescriptionScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="LibraryScreen"
                  component={LibraryScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </PersistGate>
      </Provider>
    </>
  );
}