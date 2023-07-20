import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlanUpdate = () => {
  const [Userplans, setUserPlans] = useState([]);
  const [plans, setPlans] = useState([]);
  const [date, setDate] = useState(" ");
  const [status, setStatus] = useState(" ");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const UserPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.userId;
      const response = await axios.get(`/userProfile/${Id}`);
      const data = response.data;
      setUserPlans(data.data.plan);
      setStatus(data.data.status);
      if (data.data.planExpiryDate) {
        setDate(data.data.planExpiryDate);
      } else {
        setDate("No expiry");
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

  const getPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/gym/${gymId}`);
      const data = response.data;
      setPlans(data.data.plans);
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

  const handlealert =() =>{
      alert('plan expired select new Plan');
  }

  const handlePlanSelection = async (planId) => {
    try {
      if (status === 'active') {
        const userString = await SecureStore.getItemAsync('user');
        const user = JSON.parse(userString);
        const Id = user.userId;
        console.log(planId);
        const response = await axios.patch(`/userProfile/newPlan/${Id}`, { planId });
        console.log(response.data);
        console.log(planId);
        UserPlans();
        setSelectedPlan(null);
      } else {
        const chosenPlan = plans.find((plan) => plan._id === planId);
        setSelectedPlan(chosenPlan);
        saveSelectedPlan(chosenPlan);
      }
    } catch (error) {
      console.log('Failed to update plan:', error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor, paddingBottom: 100 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Text style={{ color: 'white', fontSize: 34 }}>Gym Plan</Text>
        </View>
        {status === 'inactive' ? (
          <View style={{ margin: 20, flexDirection: 'row' }}>
            <Text style={{ color: 'white', fontSize: 18 }}>Want to Select New plan ??</Text>
            <TouchableOpacity
              onPress={() => setSelectedPlan(null)}
              style={{
                backgroundColor: bgLight,
                marginLeft: 20,
                height: 40,
                width: 120,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  color: neon,
                  fontSize: 18,
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                }}
              >
                New Plan
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <View style={styles.planContainer}>
              <Text style={styles.planName}>
                <Text style={{ color: 'white', fontSize: 20 }}>Plan Name : </Text>
                {Userplans.name}
              </Text>
              <Text style={styles.planValidity}>
                <Text style={{ color: 'white', fontSize: 20 }}>Validity (Days) : </Text>
                {Userplans.validity}
              </Text>
              <Text style={styles.planExpiry}>
                <Text style={{ color: 'white', fontSize: 20 }}>Expiry : </Text>
                {date}
              </Text>
            </View>
          </View>
        )}

        {status === 'inactive' && !selectedPlan && plans.map((plan) => (
          <View key={plan.name} style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => handlePlanSelection(plan._id)}>
              <View style={styles.plainCard}>
                <Text style={styles.h1}>{plan.plan}</Text>
                <Text style={{ color: neon, fontSize: 16, marginBottom: 10 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>
                    Name :{' '}
                  </Text>
                  {plan.name}
                </Text>
                <Text style={{ color: neon, fontSize: 16, marginBottom: 10 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>
                    Price :{' '}
                  </Text>
                  {plan.price}
                </Text>
                <Text style={{ color: neon, fontSize: 16 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>
                    Validity (Days) :{' '}
                  </Text>
                  {plan.validity}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        

        {status === 'inactive' && selectedPlan && (
          <View>
            <Text style={{ color: 'white', fontSize: 18,marginLeft:30,color:neon,fontSize:20,marginTop:50,marginBottom:20}}>Selected Plan</Text>
            <View style={styles.planContainer1}>
              <Text style={styles.planName}>
                <Text style={{ color: 'white', fontSize: 20 }}>Plan Name : </Text>
                {selectedPlan.name}
              </Text>
              <Text style={styles.planValidity}>
                <Text style={{ color: 'white', fontSize: 20 }}>Price : </Text>
                {selectedPlan.price}
              </Text>
              <Text style={styles.planValidity}>
                <Text style={{ color: 'white', fontSize: 20 }}>Validity (Days) : </Text>
                {selectedPlan.validity}
              </Text>
            </View>
          </View>
        )}      

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    backgroundColor: bgLight,
    padding: 16,
    margin: 8,
    borderRadius: 25,
    width:300,
    marginLeft:20,
  },
  planContainer1: {
    backgroundColor: bgLight,
    padding: 16,
    margin: 8,
    borderRadius: 25,
    width:350,
    marginLeft:20,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  plainCard: {
    margin: 10,
    paddingHorizontal: 20,
    backgroundColor: bgLight,
    borderRadius: 5,
    paddingBottom: 20,
    marginLeft:100,
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color:neon,
  },
  planValidity: {
    fontSize: 20,
    color: neon,
    marginBottom: 12,
  },
  planExpiry: {
    fontSize: 20,
    color: neon,
    marginBottom: 12,
  },
});

export default PlanUpdate;
