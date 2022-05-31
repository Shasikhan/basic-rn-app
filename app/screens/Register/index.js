import React, {useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, ToastAndroid, View} from 'react-native';
import styles from './styles';
import {Form, FormField, SubmitButton} from '../../components/Form';

import * as Yup from 'yup';
import Routes from '../../navigation/Routes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from '../../context/UserContext';

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

const Register = ({navigation}) => {
  const {setUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const users = await AsyncStorage.getItem('AllUsers');
      // return jsonValue != null ? JSON.parse(jsonValue) : null;
      if (users) {
        setAllUsers(JSON.parse(users));
      }
    } catch (e) {
      // error reading value
    }
  };

  const SaveNewUser = async (email, password) => {
    try {
      const jsonValue = JSON.stringify([
        ...allUsers,
        {email: email, password: password},
      ]);
      await AsyncStorage.setItem('AllUsers', jsonValue);
    } catch (e) {
      console.log('Register Error saving new user: ', e);
    }
  };

  const submitData = values => {
    const email = values['email'];
    const pass = values['password'];
    if (allUsers.length > 0) {
      const user = allUsers.find(user => user.email === email);
      if (user) {
        ToastAndroid.show(
          'Email already exist, Please login',
          ToastAndroid.SHORT,
        );
      } else {
        SaveNewUser(email, pass);
        setUser({email: email, password: pass});
        setAllUsers([...allUsers, values]);
      }
    } else {
      SaveNewUser(email, pass);
      setUser({email: email, password: pass});
      setAllUsers([values]);
    }
  };

  useEffect(() => {
    getAllUsers();
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
        <SubmitButton loading={loading} title="Register" />
        <Pressable
          style={styles.PressBtn}
          onPress={() => navigation.navigate(Routes.LOGIN)}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
      </Form>
    </ScrollView>
  );
};

export default Register;
