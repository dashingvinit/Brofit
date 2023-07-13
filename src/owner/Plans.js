import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';

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
      const response = await axios.get('/gym/3');
      const data = response.data;
      setPlans(data.data.plans);
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const handleDelete = async (planId) => {
    try {
      const response = await axios.delete(`/plan/${planId}`);
      const data1 = await response.data;
      setPlans(data1.data.plans);
      getPlans();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCreatePlan = async () => {
    try {
      const response = await axios.post('/plan', {
        gymId,
        name,
        price,
        validity
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
        validity: editValidity
      });
      alert('Plan updated');
      toggleForm();
      getPlans();
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Plans</Text>
          {plans && plans.length > 0 ?
            (plans.map((plan) => (
            <View key={plan.plan} style={{ flexDirection: 'row' }}>
              <View style={styles.plainCard}>
                <Text style={styles.h1}>{plan.plan}</Text>
                <Text style={{ color: neon, fontSize: 16, marginBottom: 10 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Name : </Text>
                  {plan.name}
                </Text>
                <Text style={{ color: neon, fontSize: 16, marginBottom: 10 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Price : </Text>
                  {plan.price}
                </Text>
                <Text style={{ color: neon, fontSize: 16 }}>
                  <Text style={{ color: 'white', fontSize: 16 }}>Validity (Days) : </Text>
                  {plan.validity}
                </Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => handleEdit(plan)} style={styles.createButton}>
                  <Text style={styles.createButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(plan._id)} style={styles.createButton}>
                  <Text style={styles.createButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
            ): (
              <Text>No plans found.</Text>
            )
        }
          {!showForm ? (
            <TouchableOpacity onPress={toggleForm} style={styles.createButton}>
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
                value={selectedPlan ? editPrice : price}
                onChangeText={selectedPlan ? setEditPrice : setPrice}
                placeholder="Price"
                style={styles.input}
              />
              <TextInput
                value={selectedPlan ? editValidity : validity}
                onChangeText={selectedPlan ? setEditValidity : setValidity}
                placeholder="Validity"
                style={styles.input}
              />
              <TouchableOpacity
                onPress={selectedPlan ? handleUpdatePlan : handleCreatePlan}
                style={styles.createButton}
              >
                <Text style={styles.createButtonText}>
                  {selectedPlan ? 'Update Plan' : 'Create Plan'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plainCard: {
    margin: 20,
    paddingHorizontal: 20,
    backgroundColor: bgLight,
    borderRadius: 5,
    width: 220,
    paddingBottom: 20,
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
    width: 150,
    height: 50,
    margin: 20,
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
  createPlanContainer: {
    marginVertical: 20,
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
