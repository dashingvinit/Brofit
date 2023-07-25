import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import { useState } from 'react';

const Userrole = () => {
  const [gymId, setGymId] = useState('');
  const [registerationNumber, setRegisterationNumber] = useState('');
  const [userData, setUserData] = useState('');
  const [role, setRole] = useState('');
  const [editMode, setEditMode] = useState(false);

  const handleSearch = () => {
    axios
      .get(`/user/${registerationNumber}/${gymId}`)
      .then(response => {
        const responseData = response.data;
        if (responseData.data) {
          setUserData(responseData.data);
        } else {
          alert('Wrong Name or Id searched');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleUpdate = () => {
    axios
      .patch(`/user/${userData._id}`, { role: role.toLowerCase() }) 
      .then(response => {
        const responseData = response.data;
        handleSearch();
        setRole(''); 
        setEditMode(false);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.container}>
        <Text style={styles.heading}>UserRole</Text>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TextInput
            style={styles.input}
            placeholder="gymId"
            value={gymId}
            onChangeText={text => setGymId(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="ID"
            value={registerationNumber}
            onChangeText={text => setRegisterationNumber(text)}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
        {userData && (
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.rowTextheading}>
                Name: <Text style={styles.rowTextanswer}>{userData.name}</Text>
              </Text>
              <Text style={styles.rowTextheading}>
                Email: <Text style={styles.rowTextanswer}>{userData.email}</Text>
              </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
            {editMode ? ( 
                <TextInput
                  style={styles.roleInput}
                  placeholder="New Role"
                  value={role} 
                  onChangeText={text => setRole(text)}
                />
              ) : (
                <Text style={styles.rowTextheading} onPress={() => setEditMode(true)}>
                  Role: <Text style={styles.rowTextanswer}>{userData.role}</Text>
                </Text>
              )}
              <TouchableOpacity onPress={handleUpdate} style={styles.UpdateButton}>
                <Text style={styles.UpdateText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginRight: 20,
    width: 130,
  },
  searchButton: {
    backgroundColor: bgLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
  UpdateButton: {
    backgroundColor: bgColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 40,
    position: 'absolute',
    top: -2,
    right: 16,
  },
  UpdateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neon,
  },
  rowContainer: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
  },
  rowTextheading: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  },
  rowTextanswer: {
    color: bgColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Userrole;
