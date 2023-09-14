import { View, Text } from 'react-native';
import React from 'react';

const CreateChart = () => {
  return (
    <View>
      <Text>CreateChart</Text>
    </View>
  );
};

export default CreateChart;

// import axios from '../../constants/Axios';
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   FlatList,
//   StyleSheet,
// } from 'react-native';
// import * as SecureStore from 'expo-secure-store';

// const CreateChart = ({ UserID }) => {
//   console.log('UserID:', UserID);

//   const [dietPlanName, setDietPlanName] = useState('');
//   const [gymId, setGymId] = useState('2');
//   const [userId, setUserId] = useState('');
//   const [dietPlanDescription, setDietPlanDescription] = useState([]);
//   const [Name, setFoodName] = useState('');
//   const [Quantity, setQuantity] = useState('');

//   const getSecureStore = async () => {
//     const user = await SecureStore.getItemAsync('user');
//     const parsedUser = JSON.parse(user);
//     console.log('Parsed User:', parsedUser);
//     setGymId(parsedUser.gymId);
//     console.log('Gym ID:', gymId);
//   };

//   useEffect(() => {
//     getSecureStore();
//   }, []);

//   const addFood = () => {
//     if (Name && Quantity) {
//       const newFoodItem = { Name, Quantity };
//       setDietPlanDescription([...dietPlanDescription, newFoodItem]);
//       setFoodName('');
//       setQuantity('');
//     }
//   };

//   const submitPlan = async () => {
//     const dietPlan = {
//       gymId,
//       dietPlanName,
//       dietPlanDescription: dietPlanDescription.map((item) => ({
//         Name: item.Name,
//         Quantity: item.Quantity,
//       })),
//     };

//     console.log('Diet Plan:', dietPlan);

//     try {
//       const response = await axios.post(
//         `/dietChart/personal/64c47426d22a31a11f08f2d6`,
//         {
//           gymId,
//           dietPlanName,
//           dietPlanDescription: dietPlanDescription.map((item) => ({
//             Name: item.Name,
//             Quantity: item.Quantity,
//           })),
//         }
//       );
//       console.log('Diet Plan Submitted:', response.data);
//     } catch (error) {
//       console.error('Error submitting diet plan:', error);
//     }
//   };

//   return (
//     <View style={{ margin: 10 }}>
//       <Text>Plan Name:</Text>
//       <TextInput
//         value={dietPlanName}
//         onChangeText={setDietPlanName}
//         placeholder="Enter plan name"
//         style={styles.input}
//       />

//       <Text>Food Items:</Text>
//       <TextInput
//         value={Name}
//         onChangeText={setFoodName}
//         placeholder="Enter food name"
//         style={styles.input}
//       />
//       <TextInput
//         value={Quantity}
//         onChangeText={setQuantity}
//         placeholder="Enter quantity"
//         style={styles.input}
//       />
//       <Button title="Add Food" onPress={addFood} />

//       <FlatList
//         data={dietPlanDescription}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View>
//             <Text>Food Name: {item.Name}</Text>
//             <Text>Quantity: {item.Quantity}</Text>
//           </View>
//         )}
//       />

//       <Button title="Submit" onPress={submitPlan} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     borderColor: 'black',
//     padding: 10,
//     backgroundColor: 'white',
//   },
// });

// export default CreateChart;
