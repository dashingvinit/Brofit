import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const Plans = () => {
  const [plans, setPlans] = useState([]);

  const getPlans = async () => {
    try {
      const response = await axios.get('/gym/2');
      const data = response.data;
      setPlans(data.data.plans);
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handledelete = async() =>{
    try {
      const response = await axios.delete(`/gym/${plans._id}`);
      const data1 = await response.data;
      setPlans(data1.data.plans);
      console.log(data1.data.plans);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Plans</Text>
        {plans.map((plan) => (
          <View key={plan.plan} style={{flexDirection:'row'}}>
            <View style={styles.plainCard}>
              <Text style={styles.h1}>{plan.plan}</Text>
              <Text style={{color:neon,fontSize:16,marginBottom:10}}><Text style={{color:'white',fontSize:16}}>Name : </Text>{plan.name}</Text>
              <Text style={{color:neon,fontSize:16,marginBottom:10}}><Text style={{color:"white",fontSize:16}}>Price : </Text>{plan.price}</Text>
              <Text style={{color:neon,fontSize:16}}><Text style={{color:"white",fontSize:16}}>Validity (Days) : </Text>{plan.validity}</Text>
            </View>
            <View>
              <TouchableOpacity style={styles.createButton}>
                  <Text style={styles.createButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createButton}>
                  <Text onPress={handledelete} style={styles.createButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'white',fontSize:16,marginTop:30,marginLeft:20}}>Wanna create new plan ??</Text>
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Plans</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plainCard: {
    margin: 20,
    paddingHorizontal:20,
    backgroundColor: bgLight,
    borderRadius: 5,
    width:220,
    paddingBottom:20,
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  createButton: {
    backgroundColor: bgLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width:150,
    height:50,
    margin:20,
},
createButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
},
});

export default Plans;
