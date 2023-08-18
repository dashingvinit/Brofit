import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GradientBG, TopBack, Hr } from './components';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { neon } from './constants/Constants';
import axios from './constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import MsgModal from './components/MsgModal';

const PlanUpdate = () => {
  const [Userplans, setUserPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [date, setDate] = useState(' ');
  const [status, setStatus] = useState(' ');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [msg, setmsg] = useState(false);
  const [warning,setwarning] = useState(false);

  const UserPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.userId || user._id;
      const response = await axios.get(`/userProfile/${Id}`);
      const data = response.data;
      // console.log(data);
      setUserPlans(data.data.plan);
      setStatus(data.data.status);
      if (data.data.planExpiryDate) {
        setDate(data.data.planExpiryDate);
      } else {
        setDate('No expiry');
      }
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  useEffect(() => {
    UserPlans();
    getPlans();
    loadSelectedPlan();
    if (status === 'inactive' && !selectedPlan) {
      handlealert();
    }
  }, []);

  useEffect(() => {
    if (warning) {
      const timeout = setTimeout(() => {
        setwarning(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [warning]);

  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setmsg(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const getPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/gym/${gymId}`);
      const data = response.data.data;
      setPlans(data.plans);
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  const loadSelectedPlan = async () => {
    try {
      const selectedPlanString = await AsyncStorage.getItem('selectedPlan');
      if (selectedPlanString) {
        const selectedPlanData = JSON.parse(selectedPlanString);
        setSelectedPlan(selectedPlanData);
      }
    } catch (error) {
      console.log('Error loading selected plan:', error);
    }
  };

  const saveSelectedPlan = async (plan) => {
    try {
      const selectedPlanString = JSON.stringify(plan);
      await AsyncStorage.setItem('selectedPlan', selectedPlanString);
    } catch (error) {
      console.log('Error saving selected plan:', error);
    }
  };

  const handlealert = () => {
    setwarning(true);
  };

  const handlePlanSelection = async (planId) => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user?.userId || user?._id;
      if (status === 'active') {
        console.log(planId);
        const response = await axios.patch(`/userProfile/newPlan/${Id}`, {
          planId,
        });
        UserPlans();
        setSelectedPlan(null);
      } else {
        setmsg(true);
        const chosenPlan = plans.find((plan) => plan._id === planId);
        setSelectedPlan(chosenPlan);
        saveSelectedPlan(chosenPlan);
        // console.log(chosenPlan);
        const response1 = await axios.patch(`/userProfile/newPlan/${Id}`, {
          planId,
        });
        // console.log(planId);
      }
    } catch (error) {
      console.log('Failed to update plan:', error);
    }
  };

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Gym Plan</TopBack>
        <ScrollView>
          {status === 'inactive' && selectedPlan && (
            <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
              <Text style={styles.Header}>Selected Plan :</Text>
              <View style={styles.planContainer1}>
                <View>
                  <Text style={styles.planName}>{selectedPlan.name}</Text>
                  <Text style={styles.planPrice}>₹ {selectedPlan.price}</Text>
                  <Text style={styles.planPrice}>
                    {selectedPlan.validity} days
                  </Text>
                </View>
                <View>
                  <LottieView
                    source={require('./assets/lottieFiles/premiumGoldCrown.json')}
                    autoPlay
                    loop
                    style={{ height: 120, width: 120, marginRight: 10 }}
                  />
                </View>
              </View>
            </View>
          )}
          {status === 'inactive' ? (
            <View style={styles.changeBtn}>
              <Text style={styles.changePlan}>Change Plan :</Text>
            </View>
          ) : (
            <View style={{ margin: 10 }}>
              <View style={styles.planContainer1}>
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.planName}>{Userplans.name}</Text>
                  <Text style={styles.planPrice}>{Userplans.validity}</Text>
                  <Text style={styles.planPrice}>{date}</Text>
                </View>
                <View>
                  <LottieView
                    source={require('./assets/lottieFiles/premiumGoldCrown.json')}
                    autoPlay
                    loop
                    style={{ height: 120, width: 120 }}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={{ paddingBottom: 100 }}>
            {status === 'inactive' &&
              plans.map((plan) => (
                <View
                  key={plan.name}
                  style={{
                    marginHorizontal: 20,
                    marginVertical: 10,
                  }}>
                  <TouchableOpacity
                    onPress={() => handlePlanSelection(plan._id)}>
                    <View style={styles.planContainer2}>
                      <View>
                        <Text style={styles.planName}>{plan.name} </Text>
                        <Text style={styles.planPrice}>₹ {plan.price}</Text>
                        <Text style={styles.planPrice}>
                          {plan.validity} days
                        </Text>
                      </View>
                      <View>
                        <LottieView
                          source={require('./assets/lottieFiles/dollarSign.json')}
                          autoPlay
                          loop
                          style={{ height: 120, width: 120 }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
          <Modal visible={msg} transparent onRequestClose={() => setmsg(false)}>
            <MsgModal message={'Plan Updated 😉'} />
          </Modal>
          <Modal visible={warning} transparent onRequestClose={() => setwarning(false)}>
            <MsgModal message={'Plan Expired select new Plan'} />
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  Header: {
    color: neon,
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
  },
  planContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1A5D1A',
    padding: 15,
    borderRadius: 25,
    borderRightColor: '#F8DE22',
    borderBottomColor: '#F8DE22',
    borderRightWidth: 2,
    borderBottomWidth: 5,
  },
  planName: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#F7FFE5',
  },
  planPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#F8DE22',
  },
  changeBtn: {
    marginHorizontal: 10,
    marginTop: 10,
    // backgroundColor: '#C8FFE0',
    // borderRadius: 10,
  },
  changePlan: {
    color: neon,
    fontSize: 24,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  planContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1B6B93',
    padding: 15,
    borderRadius: 25,
    borderRightColor: '#F8DE22',
    borderBottomColor: '#F8DE22',
    borderRightWidth: 2,
    borderBottomWidth: 5,
  },
});

export default PlanUpdate;
