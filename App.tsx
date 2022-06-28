import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import { LogBox } from 'react-native';
import RootNavigation from './src/navigation/RootNavigation';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  return (
    <NavigationContainer ref={RootNavigation.navigationRef}>
      <StackNavigator />
    </NavigationContainer>
  );
}
