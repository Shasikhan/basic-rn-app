import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login';
import Register from '../../screens/Register';
import Routes from '../Routes';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={Routes.LOGIN} component={Login} />
      <Stack.Screen name={Routes.REGISTER} component={Register} />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
