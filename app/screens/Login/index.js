import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import * as Yup from 'yup';
import {Form, FormField, SubmitButton} from '../../components/Form';
import {UserContext} from '../../context/UserContext';
import Routes from '../../navigation/Routes';
import styles from './styles';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

function Login({navigation}) {
  const {setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState(null);

  const getAllUsers = async () => {
    try {
      const users = await AsyncStorage.getItem('AllUsers');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      if (users) {
        console.log('Users: ', JSON.parse(users));
        setAllUsers(JSON.parse(users));
      }
    } catch (e) {
      console.log('Error reading Users: ', e);
    }
  };

  const submitData = values => {
    const email = values['email'];
    const pass = values['password'];
    if (allUsers) {
      const user = allUsers.find(
        user => user.email === email && user.password === pass,
      );
      if (user) {
        setUser(user);
      } else {
        ToastAndroid.show('Invalid email or password', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('User not found', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    getAllUsers();
    console.log('Login Screen');
    return () => {};
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      <Form
        initialValues={{email: '', password: ''}}
        onSubmit={values => submitData(values)}
        validationSchema={validationSchema}>
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          style={{marginBottom: 10}}
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          style={{marginBottom: 10}}
        />
        <SubmitButton loading={loading} title="Login" />
        <Pressable
          style={styles.PressBtn}
          onPress={() => navigation.navigate(Routes.REGISTER)}>
          <Text style={styles.registerText}>Register</Text>
        </Pressable>
      </Form>
    </ScrollView>
  );
}

export default Login;
