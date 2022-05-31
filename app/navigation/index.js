import React, {useContext, useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {UserContext} from '../context/UserContext';

const Navigation = () => {
  const {user, setUser} = useContext(UserContext);
  const [initializing, setInitializing] = useState(true);

  const getUserCredentials = async () => {
    try {
      const data = await AsyncStorage.getItem('UserCredentials');
      if (data) {
        console.log('User data: ', JSON.parse(data));
        setUser(JSON.parse(data));
      } else {
        console.log('User not found');
      }
    } catch (e) {
      console.log('Error reading user credentials: ', e);
    }
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    getUserCredentials();
  }, []);

  if (initializing) return null;

  return user ? <AppNavigator /> : <AuthNavigator />;
};

export default Navigation;
