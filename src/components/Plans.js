import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from '../constants/Axios';

const Plans = ({ onSelect }) => {
  const [plans, setPlans] = useState([]);

  const getplans = async () => {
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString); // Parse the user string to an object
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
    onSelect(plan);
  };

  useEffect(() => {
    getplans();
  }, []);

  if (plans.length === 0) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      {plans.map((plan) => (
        <Card key={plan._id}>
          <Card.Title>{plan.name}</Card.Title>
          <Card.Divider />
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => handlePlanClick(plan)}>
              <Text>Price: {plan.price}</Text>
              <Text>Validity: {plan.validity}</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ))}
    </>
  );
};

export default Plans;
