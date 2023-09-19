import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from '../../constants/Axios';
import { bgGlassLight, bgLight, neon } from '../../constants/Constants';
import LottieView from 'lottie-react-native';

const Plans = ({ onSelect }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const getPlans = async () => {
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString);
    const gymId = user.gymId;
    console.log('gymId', gymId);
    await axios
      .get(`/plan/${gymId}`)
      .then((response) => {
        const plans = response.data.data;
        setPlans(plans);
        // console.log(plans);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
    onSelect(plan);
  };

  useEffect(() => {
    getPlans();
  }, []);

  if (plans.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {plans.map((item) => (
        <TouchableOpacity
          key={item._id}
          style={[styles.card, selectedPlan === item && styles.selectedCard]}
          onPress={() => handlePlanClick(item)}
          underlayColor="#f0f0f0">
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.content}>Price: {item.price}</Text>
            <Text style={styles.content}>Validity: {item.validity}d</Text>
          </View>
          <LottieView
            source={require('../../assets/lottieFiles/premiumGoldCrown.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          />
        </TouchableOpacity>
      ))}
      {plans.length === 0 && <Text>No plans available.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    width: '100%',
    height: 150,
    backgroundColor: bgGlassLight,
    borderRadius: 15,
    alignItems: 'center',
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: neon,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: neon,
  },
  content: {
    fontSize: 20,
    color: 'white',
  },
});

export default Plans;
