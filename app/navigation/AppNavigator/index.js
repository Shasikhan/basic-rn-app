import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../../screens/Home';
import Routes from '../Routes';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.HOME} component={Home} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
