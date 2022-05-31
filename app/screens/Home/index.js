import React, {useContext} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {UserContext} from '../../context/UserContext';
import styles from './styles';

const Home = () => {
  const {setUser} = useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>HOME</Text>

      <Pressable onPress={() => setUser(null)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Home;
