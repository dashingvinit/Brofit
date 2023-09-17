import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Modal,
  Pressable,
  Text,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import { neon } from '../../constants/Constants';
import LottieView from 'lottie-react-native';

const UserDelete = (props) => {
  const [Delete, setDelete] = useState(false);
  const [Loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setDelete(false);
    setLoading(true);
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString);
    const userID = user?.userId || user?._id;
    console.log(userID);
    try {
      const data = await axios.delete(`user/${userID}`);
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      props.setHandleLogout();
      props.navigation.navigate('Welcome');
    } catch (error) {
      alert('An error occurred');
    }
    setLoading(false);
  };

  const handled = async () => {
    setDelete(true);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handled}>
          <Ionicons name="trash" size={30} color="#F3FDE8" />
        </TouchableOpacity>
      </View>
      <Modal
        visible={Delete}
        transparent
        onRequestClose={() => setDelete(false)}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'black',
              borderRadius: 15,
              marginBottom: 0,
            }}>
            <View style={{ marginTop: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, color: neon }}>
                Want to delete account ?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                gap: 10,
                marginRight: 20,
              }}>
              <View style={{ alignItems: 'center', paddingVertical: 5 }}>
                <Pressable onPress={() => setDelete(false)}>
                  <Text style={{ fontSize: 16, color: neon }}>No</Text>
                </Pressable>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}>
                <Pressable onPress={handleDelete}>
                  <Text style={{ fontSize: 16, color: neon }}>Yes</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {Loading && (
        <View
          style={{
            position: 'absolute',
            top: -800,
            bottom: -200,
            left: '-340%',
            right: '-120%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            source={require('../../assets/lottieFiles/loadingSkeliton.json')}
            autoPlay
            loop
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginRight: 30,
  },
});

export default UserDelete;
