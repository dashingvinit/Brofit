import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  RefreshControl,
  Modal,
  StyleSheet,
} from 'react-native';
import { FetchQuote, CheckIn, Calendar, GradientBG } from '../components';
import {
  bgColor,
  bgGlass,
  bgGlassLight,
  bgLight,
  neon,
} from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import LottieView from 'lottie-react-native';

const Attendance = () => {
  const [attendance, setAttendance] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setwarning] = useState(false);
  const [msg, setmsg] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync('attendance').then((res) => {
      if (res) {
        const attendanceData = JSON.parse(res);
        // Assuming checkIn and checkOut are properties of the stored attendanceData object
        const formattedAttendance =
          'Last session ' +
          attendanceData.checkIn +
          ' - ' +
          attendanceData.checkOut;
        setAttendance(formattedAttendance);
      }
    });
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
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
      setLoading(false);
      await SecureStore.setItemAsync(
        'attendance',
        JSON.stringify(response.data.data)
      );
      setAttendance('Checked Out ' + response.data.data.checkOut);
    } catch (error) {
      const errMsg = error.response.data.error.message;
      setAttendance(errMsg);
      setLoading(false);
    }
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
          <View style={styles.modalContainer}>
            <View style={styles.modalMsgContainer}>
              <View style={styles.modalTxtContainer}>
                <Text style={styles.modalTxt}>Bro, are you leaving ?</Text>
              </View>
              <View style={styles.modalOption}>
                <View
                  style={{
                    alignItems: 'center',
                    padding: 15,
                  }}>
                  <TouchableOpacity onPress={() => setwarning(false)}>
                    <Text style={{ fontSize: 16, color: neon }}>No</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    padding: 15,
                  }}>
                  <TouchableOpacity onPress={handleout}>
                    <Text style={{ fontSize: 16, color: neon }}>Yes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={msg} transparent onRequestClose={() => setmsg(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalMsgContainer}>
              <View style={styles.modalTxtContainer}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.modalTxt}>{attendance}</Text>
                </View>
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
              source={require('../assets/lottieFiles/graphLoading.json')}
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
        <View style={styles.bottomBlack}>
          <Text style={styles.bottomMsg}>
            {attendance ? attendance : 'Go to the gym'}
          </Text>
          <View style={styles.btnContainer}>
            <CheckIn setAttendance={setAttendance} />
            <TouchableOpacity
              style={styles.checkOutBtn}
              onPress={handleCheckout}>
              {loading ? (
                <LottieView
                  source={require('../assets/lottieFiles/loadingcircles.json')}
                  autoPlay
                  loop
                  style={{ height: 20, width: 25 }}
                />
              ) : (
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  CheckOUT
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.9)',
  },
  modalMsgContainer: {
    width: '80%',
    backgroundColor: bgGlassLight,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
  },
  modalTxtContainer: {
    paddingVertical: 30,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    backgroundColor: bgGlass,
    alignItems: 'center',
  },
  modalTxt: {
    fontSize: 18,
    color: 'white',
  },
  modalOption: {
    backgroundColor: bgGlassLight,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  modalMessage: {
    width: '80%',
    backgroundColor: bgColor,
    borderRadius: 15,
    justifyContent: 'center',
  },
  bottomBlack: {
    marginTop: 20,
    alignItems: 'center',
    paddingBottom: 90,
    backgroundColor: 'black',
    borderTopRightRadius: 45,
    borderTopLeftRadius: 45,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomMsg: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  checkOutBtn: {
    alignItems: 'center',
    marginLeft: 5,
    backgroundColor: bgLight,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: 150,
  },
  pageLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Attendance;
