import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { bgColor, bgGlass, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { GradientBG, TopBack, LoadingSkeleton } from '../components';

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [gymId, setGymId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [validity, setValidity] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editValidity, setEditValidity] = useState('');

  const getPlans = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString); // Parse the user string to an object
      const gymId = user.gymId;
      const response = await axios.get(`/gym/${gymId}`);
      const data = response.data;
      // console.log('plans: ', data.data.plans);
      setPlans(data.data.plans);
    } catch (error) {
      console.log('plans Owner: ' + error);
    }
  };

  // const handleDelete = async (planId) => {
  //   try {
  //     const response = await axios.delete(`/plan/${planId}`);
  //     const data1 = await response.data;
  //     setPlans(data1.data.plans);
  //     getPlans();
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // };

  const handleCreatePlan = async () => {
    try {
      const response = await axios.post('/plan', {
        gymId,
        name,
        price,
        validity,
      });
      alert('Plan created');
      toggleForm();
      setGymId('');
      setName('');
      setPrice('');
      setValidity('');
      getPlans();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setEditName(plan.name);
    setEditPrice(plan.price);
    setEditValidity(plan.validity);
    toggleForm();
  };

  const toggleForm = () => {
    if (showForm) {
      setSelectedPlan(null);
      setEditName('');
      setEditPrice('');
      setEditValidity('');
    }
    setShowForm(!showForm);
  };

  const handleUpdatePlan = async () => {
    try {
      const response = await axios.patch(`/plan/${selectedPlan._id}`, {
        name: editName,
        price: editPrice,
        validity: editValidity,
      });
      alert('Plan updated');
      toggleForm();
      getPlans();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Plans</TopBack>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            {plans && plans.length > 0 ? (
              plans.map((plan) => (
                <View key={plan.name}>
                  <View style={styles.plainCard}>
                    <Text style={styles.cardText}>
                      <Text style={{ color: 'white', fontSize: 16 }}>
                        Name :{' '}
                      </Text>
                      {plan.name}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text style={{ color: 'white', fontSize: 16 }}>
                        Price :{' '}
                      </Text>
                      {plan.price}
                    </Text>
                    <Text style={styles.cardText}>
                      <Text style={{ color: 'white', fontSize: 16 }}>
                        Validity (Days) :{' '}
                      </Text>
                      {plan.validity}
                    </Text>

                    {/* <View
                    style={{
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => handleEdit(plan)}
                      style={styles.createButton}>
                      <Text style={styles.createButtonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleDelete(plan._id)}
                      style={styles.createButton}>
                      <Text style={styles.createButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </View> */}
                  </View>
                  <TouchableOpacity
                    onPress={() => handleEdit(plan)}
                    style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <LoadingSkeleton />
            )}
            {!showForm ? (
              <TouchableOpacity
                onPress={toggleForm}
                style={styles.createButton}>
                <Text style={styles.createButtonText}>Create Plan</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.createPlanContainer}>
                <Text style={styles.createPlanText}>
                  {selectedPlan ? 'Edit Plan' : 'Create New Plan'}
                </Text>
                {!selectedPlan && (
                  <TextInput
                    value={gymId}
                    onChangeText={setGymId}
                    placeholder="Gym ID"
                    style={styles.input}
                  />
                )}
                <TextInput
                  value={selectedPlan ? editName : name}
                  onChangeText={selectedPlan ? setEditName : setName}
                  placeholder="Name"
                  style={styles.input}
                />
                <TextInput
                  keyboardType={
                    Platform.OS === 'android'
                      ? 'phone-pad'
                      : Platform.OS === 'ios'
                      ? 'number-pad'
                      : 'numbers-and-punctuation'
                  }
                  value={selectedPlan ? editPrice.toString() : price}
                  onChangeText={selectedPlan ? setEditPrice : setPrice}
                  placeholder="Price"
                  style={styles.input}
                />
                <TextInput
                  keyboardType={
                    Platform.OS === 'android'
                      ? 'phone-pad'
                      : Platform.OS === 'ios'
                      ? 'number-pad'
                      : 'numbers-and-punctuation'
                  }
                  value={selectedPlan ? editValidity.toString() : validity}
                  onChangeText={selectedPlan ? setEditValidity : setValidity}
                  placeholder="Validity"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={selectedPlan ? handleUpdatePlan : handleCreatePlan}
                  style={styles.createButton}>
                  <Text style={styles.createButtonText}>
                    {selectedPlan ? 'Update Plan' : 'Create Plan'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  plainCard: {
    marginTop: 10,
    marginHorizontal: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: bgGlass,
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
  },
  cardText: {
    color: neon,
    fontSize: 16,
    marginBottom: 10,
  },
  editBtn: {
    marginHorizontal: 20,
    backgroundColor: neon,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  editBtnText: {
    color: bgColor,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
  },
  createButton: {
    backgroundColor: bgGlass,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    margin: 20,
  },
  heading: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
  createPlanContainer: {
    marginVertical: 20,
    marginHorizontal: 10,
  },
  createPlanText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default Plans;
