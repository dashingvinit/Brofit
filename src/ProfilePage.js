import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, neon, bgLight } from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(null);
  const [editable, setEditable] = useState(false);
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      setUsername(user.name);
      const response = await axios.get(`/userProfile/${user.userId}`);
      const data = await response.data;
      setUserData(data.data);
    } catch (error) {
      console.log('User Profile Error', error);
    }
  };

  const handleEdit = () => {
    setEditable(true);
    setEditName(username);
    setEditAge(userData.age); 
    setEditHeight(userData.height); 
    setEditWeight(userData.weight); 
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        name: editName,
        age: parseInt(editAge),
        height: parseInt(editHeight),
        weight: parseInt(editWeight),
      };

      // Send the updated data to the API using axios or fetch
      // For this example, I'm assuming you are using axios:

      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);

      await axios.patch(`/userProfile/${user.userId}`, updatedData);

      // Update the local state with the new data
      setUsername(editName);
      setUserData({
        ...userData,
        age: parseInt(editAge),
        height: parseInt(editHeight),
        weight: parseInt(editWeight),
      });

      // Reset editable state
      setEditable(false);
    } catch (error) {
      console.log('Update Profile Error', error);
      // Handle error here
    }
  };

  // Render null if userData is not available yet
  if (!userData) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <Text style={{ color: neon, fontSize: 28 }}>Profile 😉</Text>
      </View>

      <View style={styles.container}>
        {editable ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              value={editAge}
              onChangeText={setEditAge}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Height"
              value={editHeight}
              onChangeText={setEditHeight}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Weight"
              value={editWeight}
              onChangeText={setEditWeight}
              keyboardType="numeric"
            />
            <TouchableOpacity onPress={handleSave} style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.text}>Name: {username}</Text>
            <Text style={styles.text}>Age: {userData?.age}</Text>
            <Text style={styles.text}>Height: {userData?.height}</Text>
            <Text style={styles.text}>Weight: {userData?.weight}</Text>
            <Text style={styles.text}>
              Plan: {userData?.plan ? userData.plan.name : 'Plans not found'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Status: {userData?.status}</Text>
              <TouchableOpacity onPress={handleEdit} style={styles.button}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: bgLight,
    borderRadius: 30,
    marginHorizontal: 20,
    marginVertical: 40,
  },
  text: {
    color: neon,
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: bgColor,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 70,
    height: 40,
    width: 100,
  },
  buttonText: {
    color: neon,
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfilePage;
