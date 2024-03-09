import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './navigation/appNavigation';
import store from './redux/store';
import { Provider } from 'react-redux';


export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <AppNavigation/>
    </NavigationContainer>
    </Provider>
  );
}
