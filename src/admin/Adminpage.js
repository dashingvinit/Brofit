import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';

const AdminPage = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [gymName, setgymName] = useState('');
  const [gymId, setGymId] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [owner,setowner] = useState('');
  const handleAddGym = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    const formData = {
      gymName,
      gymId,
      email,
      latitude,
      longitude,
      owner,
    };
    
    fetch('http://192.168.29.77:7000/api/v1/gym', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          alert('Gym added successfully!');
          setShowForm(false);
          setgymName('');
          setGymId('');
          setEmail('');
          setLatitude('');
          setLongitude('');
          setowner('');
        } else {
            alert('Failed to add gym.');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
      });
  };

  const handleUsersRole = () => {
    
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Admins</Text>
        <TouchableOpacity onPress={handleAddGym} style={styles.userContainer}>
          <Text style={styles.userText}>Add Gym</Text>
        </TouchableOpacity>

        {showForm && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="gymName"
              value={gymName}
              onChangeText={setgymName}
            />
            <TextInput
              style={styles.input}
              placeholder="Gym ID"
              value={gymId}
              onChangeText={setGymId}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="owner"
              value={owner}
              onChangeText={setowner}
              keyboardType="string"
            />
            <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity onPress={() => props.navigation.navigate('Userrole')} style={styles.userContainer}>
          <Text style={styles.userText}>User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 50,
    backgroundColor: bgLight,
    borderRadius: 40,
    width: 200,
  },
  userText: {
    fontSize: 20,
    color: neon,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: bgLight,
    borderRadius: 10,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: bgLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neon,
  },
});

export default AdminPage;
