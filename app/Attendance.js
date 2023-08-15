import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Modal,
  Pressable,
} from 'react-native';

import { FetchQuote, CheckIn, Calendar, GradientBG } from './components';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';

const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setwarning] = useState(false);
  const [msg, setmsg] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleCheckin = async () => {
    setAttendance('Checked In');
    setLoading(false);
  };

  const handleCheckout = async () => {
    setwarning(true);
  };

  const handleout = async () => {
    setwarning(false);
    setLoading(true);
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user?.userId || user?._id;
      const response = await axios.patch(`/attendance/${Id}`);
      setAttendance('Checked Out');
    } catch (error) {
      console.log('Error: ' + error);
    }
    setLoading(false);
    setmsg(true);
  };

  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setmsg(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [msg]);

  return (
    <GradientBG>
      <View style={{ flex: 1 }}>
        <Modal
          visible={warning}
          transparent
          onRequestClose={() => setwarning(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <View
              style={{
                width: '60%',
                height: '12%',
                backgroundColor: bgColor,
                borderRadius: 25,
                marginBottom: 0,
              }}>
              <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: neon }}>
                  Bro, are you leaving ?
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
                  <Pressable onPress={() => setwarning(false)}>
                    <Text style={{ fontSize: 16, color: neon }}>No</Text>
                  </Pressable>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  }}>
                  <Pressable onPress={handleout}>
                    <Text style={{ fontSize: 16, color: neon }}>Yes</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={msg} transparent onRequestClose={() => setmsg(false)}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#00000099',
            }}>
            <View
              style={{
                width: '65%',
                height: '12%',
                backgroundColor: bgColor,
                borderRadius: 25,
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: neon }}>
                  See you tommorow, Bro💪🏻
                </Text>
              </View>
            </View>
          </View>
        </Modal>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 160 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              color={'blue'}
            />
          }>
          <FetchQuote />
          {refreshing ? (
            <LottieView
              source={require('./assets/lottieFiles/graphLoading.json')}
              autoPlay
              loop
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
          ) : (
            <Calendar />
          )}
        </ScrollView>
        <View
          style={{
            marginTop: 20,
            alignItems: 'center',
            paddingBottom: 90,
            backgroundColor: 'black',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,

            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 18,
              padding: 20,
            }}>
            {attendance ? attendance : ''}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 30,
            }}>
            <CheckIn checkINStatus={handleCheckin} />

            <TouchableOpacity
              style={{
                marginLeft: 5,
                backgroundColor: bgLight,
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderRadius: 30,
                width: 150,
              }}
              disabled={attendance === 'Checked In' ? false : true}
              onPress={handleCheckout}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>
                CheckOUT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('./assets/lottieFiles/loadingSkeliton.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </View>
    </GradientBG>
  );
};

export default Attendance;
