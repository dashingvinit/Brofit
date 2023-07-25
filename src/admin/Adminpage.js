import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Top, GradientBG } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';

const AdminPage = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [gymName, setGymName] = useState('');
  const [gymId, setGymId] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [owner, setOwner] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

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
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert('Gym added successfully!');
          setShowForm(false);
          setGymName('');
          setGymId('');
          setEmail('');
          setLatitude('');
          setLongitude('');
          setOwner('');
        } else {
          alert('Failed to add gym.');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
      });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/gym/${search}`);
      const dataArray = response.data.data;
      setData(dataArray);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <Top
          navigation={props.navigation}
          setHandleLogout={props.setHandleLogout}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.heading}>Admins</Text>
            <TouchableOpacity
              onPress={handleAddGym}
              style={styles.userContainer}>
              <Text style={styles.userText}>Add Gym</Text>
            </TouchableOpacity>
            {!showForm && (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    marginBottom: 20,
                  }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Gym ID"
                    value={search}
                    onChangeText={(text) => setSearch(text)}
                  />
                  <TouchableOpacity
                    onPress={handleSearch}
                    style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                  </TouchableOpacity>
                </View>

                {data == null ? (
                  <View style={styles.rowContainer}>
                    <View>
                      <Text style={styles.rowTextheading}>
                        Gym Name:{' '}
                        <Text style={styles.rowTextanswer}>{data.gymName}</Text>
                      </Text>
                      <Text style={styles.rowTextheading}>
                        Owner Name:{' '}
                        <Text style={styles.rowTextanswer}>{data.owner}</Text>
                      </Text>
                      <Text style={styles.rowTextheading}>
                        Email:{' '}
                        <Text style={styles.rowTextanswer}>{data.email}</Text>
                      </Text>
                      <Text style={styles.rowTextheading1}>
                        GymId:{' '}
                        <Text style={styles.rowTextanswer1}>{data.gymId}</Text>
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.rowContainer}>
                    <Text style={styles.dataNotFoundText}>Data not found</Text>
                  </View>
                )}
              </View>
            )}

            {showForm && (
              <View style={styles.formContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Gym Name"
                  value={gymName}
                  onChangeText={setGymName}
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
                  placeholder="Owner Name"
                  value={owner}
                  onChangeText={setOwner}
                />
                <View style={{ alignItems: 'center', marginTop: 10 }}>
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
    </GradientBG>
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
    alignSelf: 'center',
  },
  userContainer: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 20,
    backgroundColor: bgLight,
    borderRadius: 40,
    width: 150,
    marginLeft: 20,
    marginBottom: 50,
    alignSelf: 'center',
  },
  userContainer1: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 50,
    width: 200,
  },
  heading1: {
    fontSize: 14,
    color: neon,
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
    width: 250,
  },
  submitButton: {
    backgroundColor: bgColor,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width: 150,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neon,
  },
  rowContainer: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    width: 350,
    marginBottom: 30,
  },
  rowContainer1: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 20,
    width: 170,
  },
  rowTextheading: {
    color: bgColor,
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
  rowTextheading1: {
    color: bgColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  },
  rowTextanswer1: {
    color: bgColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: bgLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    marginLeft: 20,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
});

export default AdminPage;
