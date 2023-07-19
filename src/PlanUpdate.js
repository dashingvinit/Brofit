import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { bgColor, bgLight, neon } from './constants/Constants';
import axios from './constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const PlanUpdate = () => {
  const [Userplans, setUserPlans] = useState([]);
  const [plans, setPlans] = useState([]);


  const UserPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.userId;
      console.log(Id);
      const response = await axios.get(`/userProfile/${Id}`);
      const data = response.data;
      setUserPlans(data.data.plan);
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  useEffect(() => {
    UserPlans();
  }, []);

  const getPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString); // Parse the user string to an object
      const gymId = user.gymId;
      console.log('gymId: ' + gymId);
      const response = await axios.get(`/gym/${gymId}`);
      const data = response.data;
      setPlans(data.data.plans);
      console.log(data.data.plans)
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  const handleupdate = async() =>{
        getPlans();
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: bgColor, paddingBottom: 100 }}>
      <ScrollView>
        <View>
          <View style={{alignItems:'center',marginBottom:20}}>
            <Text style={{color:"white",fontSize:34}}>Gym Plan</Text>
          </View>
            <View style={styles.planContainer}>
              <Text style={styles.planName}><Text style={{color:"white",fontSize:20}}>Plan Name : </Text>{Userplans.name}</Text>
              <Text style={styles.planValidity}><Text style={{color:"white",fontSize:20}}>Validity (Days) : </Text>{Userplans.validity}</Text>
              <Text style={styles.planExpiry}><Text style={{color:"white",fontSize:20}}>Expiry : </Text>{Userplans.validity}</Text>
            </View>
        </View>
        <View style={{margin:20,flexDirection:'row'}}>
            <Text style={{color:"white",fontSize:18}}>Wanna edit plan ??</Text>
            <TouchableOpacity onPress={handleupdate} style={{backgroundColor: bgLight, marginLeft:20,height:40,width:100,borderRadius:15}}>
              <Text style={{color:neon,fontSize:18,paddingHorizontal:14,paddingVertical:8}}>Update</Text>
            </TouchableOpacity>
        </View>

        {plans.map((plan) => (
              <View key={plan.name} style={{ flexDirection: 'row'}}>
                <TouchableOpacity onPress={{}}>
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
            ))
          }
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
