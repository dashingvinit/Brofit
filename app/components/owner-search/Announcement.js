import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { bgColor, neon } from '../../constants/Constants';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';

const Announcement = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const msgsend = async () => {
    setLoading(true);
    if (message === '') {
      setLoading(false);
      return;
    }
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      const response = await axios.post(`/noti/${Id}`, {
        content: message,
      });

      setMessage('');
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error);
      } else {
        console.error('Error in pushing notification data:', error);
      }
    }
  };

  return (
    <View
      style={{
        marginTop: 50,
        backgroundColor: bgColor,
        paddingBottom: 50,
        paddingTop: 50,
        borderRadius: 25,
        margin: 15,
      }}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: neon, fontSize: 24 }}> Announcements </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder=" Message "
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.button} onPress={msgsend}>
          <Text style={{ fontSize: 20 }}>Send</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: -400,
            bottom: -50,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../assets/lottieFiles/greenTik.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    color: 'black',
    backgroundColor: '#FAF3F0',
    borderRadius: 10,
    padding: 10,
    margin: 20,
    width: '85%',
  },
  button: {
    backgroundColor: neon,
    height: 40,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Announcement;
