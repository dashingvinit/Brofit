import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from '../constants/Axios';
import { bgLight, neon } from '../constants/Constants';

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

  const renderItem = ({ item }) => (
    <View style={[styles.card, selectedPlan === item && styles.selectedCard]}>
      <TouchableOpacity
        onPress={() => handlePlanClick(item)}
        underlayColor="#f0f0f0">
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.content}>Price: {item.price}</Text>
        <Text style={styles.content}>Validity: {item.validity}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={plans}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListEmptyComponent={<Text>No plans available.</Text>}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  card: {
    marginVertical: 10,
    padding: 20,
    width: 300,
    backgroundColor: bgLight,
    borderRadius: 10,
    alignItems: 'center',
  },
  selectedCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: neon,
  },
  content: {
    fontSize: 16,
    color: 'white',
  },
});

export default Plans;
