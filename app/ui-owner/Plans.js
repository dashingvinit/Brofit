import React, { useState, useEffect, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { bgColor, bgGlass, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { GradientBG, MsgModal, PlanCount } from '../components';

import LottieView from 'lottie-react-native';

const Plans = () => {
  const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState([]);
  const [formState, setFormState] = useState({
    gymId: '',
    name: '',
    price: '',
    validity: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editFormState, setEditFormState] = useState({
    editName: '',
    editPrice: '',
    editValidity: '',
  });
  const [plandone, setPlandone] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [createPlanDone, setCreatePlanDone] = useState(false);
  const [count, setCount] = useState(-1);

  const scrollRef = useRef(null);

  const getPlans = async () => {
    setLoading(true);
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      setFormState((prevState) => ({ ...prevState, gymId }));
      const response = await axios.get(`/gym/${gymId}`);
      setPlans(response.data.data.plans);
    } catch (error) {
      console.log('Error fetching plans:', error);
    }
    setLoading(false);
  };

  const getCount = async (gymId, planId) => {
    const count = await axios.get(
      `/userProfile/planMemberCount/${gymId}/${planId}`
    );
    console.log(count.data.data.count);
    setCount(count.data.data.count);
  };

  const handleCreatePlan = async () => {
    setLoading(true);
    try {
      await axios.post('/plan', formState);
      setCreatePlanDone(true);
      toggleForm();
      setFormState({
        gymId: '',
        name: '',
        price: '',
        validity: '',
      });
      getPlans();
    } catch (error) {
      console.log('Error creating plan:', error);
    }
    setLoading(false);
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setEditFormState({
      editName: plan.name,
      editPrice: plan.price,
      editValidity: plan.validity,
    });
    toggleForm();
    scrollRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const toggleForm = () => {
    if (showForm) {
      setSelectedPlan(null);
      setEditFormState({
        editName: '',
        editPrice: '',
        editValidity: '',
      });
    }
    setShowForm(!showForm);
    setShowCancelButton(!showCancelButton);
  };

  const handleUpdatePlan = async () => {
    setLoading(true);
    try {
      await axios.patch(`/plan/${selectedPlan._id}`, editFormState);
      setPlandone(true);
      toggleForm();
      getPlans();
    } catch (error) {
      console.log('Error updating plan:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPlans();
  }, []);

  useEffect(() => {
    const clearPlandone = () => setPlandone(false);
    const clearCreatePlanDone = () => setCreatePlanDone(false);

    if (plandone) {
      const timeout = setTimeout(clearPlandone, 2000);
      return () => clearTimeout(timeout);
    }

    if (createPlanDone) {
      const timeout = setTimeout(clearCreatePlanDone, 2000);
      return () => clearTimeout(timeout);
    }
  }, [plandone, createPlanDone]);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView ref={scrollRef}>
          <View style={styles.row}>
            <PlanCount count={plans.length} />
          </View>
          <View style={styles.container}>
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
                <TextInput
                  value={selectedPlan ? editFormState.editName : formState.name}
                  onChangeText={(text) =>
                    selectedPlan
                      ? setEditFormState((prevState) => ({
                          ...prevState,
                          editName: text,
                        }))
                      : setFormState((prevState) => ({
                          ...prevState,
                          name: text,
                        }))
                  }
                  placeholder="Name"
                  placeholderTextColor={'black'}
                  style={styles.input}
                />
                <TextInput
                  keyboardType={'phone-pad'}
                  value={
                    selectedPlan
                      ? editFormState.editPrice.toString()
                      : formState.price
                  }
                  onChangeText={(text) =>
                    selectedPlan
                      ? setEditFormState((prevState) => ({
                          ...prevState,
                          editPrice: text,
                        }))
                      : setFormState((prevState) => ({
                          ...prevState,
                          price: text,
                        }))
                  }
                  placeholder="Price"
                  placeholderTextColor={'black'}
                  style={styles.input}
                />
                <TextInput
                  keyboardType={'phone-pad'}
                  value={
                    selectedPlan
                      ? editFormState.editValidity.toString()
                      : formState.validity
                  }
                  onChangeText={(text) =>
                    selectedPlan
                      ? setEditFormState((prevState) => ({
                          ...prevState,
                          editValidity: text,
                        }))
                      : setFormState((prevState) => ({
                          ...prevState,
                          validity: text,
                        }))
                  }
                  placeholder="Validity"
                  placeholderTextColor={'black'}
                  style={styles.input}
                />
                <View style={styles.createButtonGroup}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleForm();
                      setShowCancelButton(false);
                    }}
                    style={styles.createButton}>
                    <Text style={styles.createButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={selectedPlan ? handleUpdatePlan : handleCreatePlan}
                    style={styles.createButton}>
                    <Text style={styles.createButtonText}>
                      {selectedPlan ? 'Update Plan' : 'Create Plan'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {plans && plans.length > 0 ? (
              plans.map((plan) => (
                <View key={plan.name}>
                  <View style={styles.plainCard}>
                    <View>
                      <Text style={styles.cardText}>
                        <Text style={styles.cardLabelText}>Name : </Text>
                        {plan.name}
                      </Text>
                      <Text style={styles.cardText}>
                        <Text style={styles.cardLabelText}>Price : </Text>
                        {plan.price}
                      </Text>
                      <Text style={styles.cardText}>
                        <Text style={styles.cardLabelText}>
                          Validity (Days) :{' '}
                        </Text>
                        {plan.validity}
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          getCount(plan.gymId, plan._id);
                        }}>
                        <LottieView
                          source={require('../assets/lottieFiles/dollarSign.json')}
                          autoPlay
                          loop
                          style={styles.lottie}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleEdit(plan)}
                    style={styles.editBtn}>
                    <Text style={styles.editBtnText}>Edit</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={styles.noPlansContainer}>
                <Text style={styles.noPlansText}>No Plans</Text>
              </View>
            )}
          </View>
          <Modal
            visible={plandone}
            transparent
            onRequestClose={() => setPlandone(false)}>
            <MsgModal message={'Plan Updated 🏋🏽'} />
          </Modal>
          <Modal
            visible={createPlanDone}
            transparent
            onRequestClose={() => setCreatePlanDone(false)}>
            <MsgModal message={'Plan created 🏋🏽'} />
          </Modal>
        </ScrollView>
        {loading && (
          <View style={styles.loadingOverlay}>
            <LottieView
              source={require('../assets/lottieFiles/loadingSkeliton.json')}
              autoPlay
              loop
            />
          </View>
        )}
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    marginHorizontal: 15,
  },
  container: {
    flex: 1,
    paddingBottom: 100,
    marginHorizontal: 10,
  },
  plainCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: bgGlass,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  cardText: {
    color: neon,
    fontSize: 16,
    marginBottom: 10,
  },
  cardLabelText: {
    color: 'white',
    fontSize: 16,
  },
  editBtn: {
    backgroundColor: neon,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
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
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: 50,
    marginVertical: 10,
  },
  createButtonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: bgGlass,
    borderRadius: 10,
  },
  createButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
  heading: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
  lottie: {
    height: 100,
    width: 100,
  },
  noPlansContainer: {
    alignItems: 'center',
  },
  noPlansText: {
    color: neon,
    fontSize: 20,
  },
  loadingOverlay: {
    position: 'absolute',
    top: -100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Plans;
