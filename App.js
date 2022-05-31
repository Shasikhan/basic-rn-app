/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {UserProvider} from './app/context/UserContext';
import Navigation from './app/navigation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <GestureHandlerRootView style={{flex: 1}}>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
