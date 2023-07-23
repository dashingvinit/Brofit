import React, { useState } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Top from '../components/Top';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';

const AdminPage = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [gymName, setgymName] = useState('');
  const [gymId, setGymId] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [owner, setowner] = useState('');
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
  
    axios
      .post('/gym', formData, {
        headers: {
          'Content-Type': 'application/json', // Remove the extra space here
        },
      })
      .then((response) => {
        if (response.status===201) { // Check for the correct status code
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
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <Top
        navigation={props.navigation}
        setHandleLogout={props.setHandleLogout}
      />
      <ScrollView>
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
            />
            <View style={{alignItems:'center',marginTop:10}}>
              <TouchableOpacity
                onPress={handleFormSubmit}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems:'center',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
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
    width: '95%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: bgColor,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width:150,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neon,
  },
});

export default AdminPage;
