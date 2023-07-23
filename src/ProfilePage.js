import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { GraphLoading } from './components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, neon, bgLight } from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(null);
  const [editable, setEditable] = useState(false);
  // const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [Id, setId] = useState('');
  const [planExiper, setPlanExiper] = useState('');

  const fetchUserProfileData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      setUsername(user.name);
      const response = await axios.get(`/userProfile/${user.userId}`);
      const data = await response.data;
      setUserData(data.data);
      setId(data.data._id);
    } catch (error) {
      console.log('User Profile Error', error);
    }
  };

  const handleEdit = () => {
    setEditable(true);
    // setEditName(username);
    setEditAge(userData.age.toString()); // Convert to string for TextInput
    setEditHeight(userData.height.toString()); // Convert to string for TextInput
    setEditWeight(userData.weight.toString()); // Convert to string for TextInput
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        age: parseFloat(editAge),
        height: editHeight,
        weight: editWeight,
      };

      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      await axios.patch(`/userProfile/${Id}`, updatedData);
      fetchUserProfileData();
      setEditable(false);
    } catch (error) {
      console.log('Update Profile Error', error);
    }
  };

  const getDifferenceInDays = async (dateString) => {
    if (!dateString) return null;
    try {
      const [day, month, year] = dateString.split('-').map(Number);
      const givenDate = new Date(year, month - 1, day);
      if (isNaN(givenDate.getTime())) return null;
      const currentDate = new Date();
      const timeDifferenceInMilliseconds = givenDate - currentDate;
      const differenceInDays = Math.floor(
        timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
      );
      return differenceInDays;
    } catch (error) {
      console.log('Error in getDifferenceInDays', error);
    }
  };

  useEffect(() => {
    const fetchAndCalculatePlanExpiry = () => {
      fetchUserProfileData();
      const givenDateString = userData?.planExpiryDate;

      if (userData && givenDateString) {
        const differenceInDays = getDifferenceInDays(givenDateString);
        setPlanExiper(differenceInDays);
      }
    };
    fetchAndCalculatePlanExpiry();
  }, []);

  if (!userData) return <GraphLoading />;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: bgColor,
        paddingTop: 20,
        paddingBottom: 100,
      }}>
      <ScrollView>
        <View style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <Image
              source={require('./assets/images/profile.jpg')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={styles.userName}>{username}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, color: bgLight }}>
              {userData?.userId.email}
            </Text>
          </View>
          <View style={styles.profileIcons}>
            <View style={{ alignItems: 'center' }}>
              {userData?.status == 'active' ? (
                <MaterialCommunityIcons
                  name="card-bulleted-outline"
                  size={30}
                  color={bgColor}
                />
              ) : (
                <MaterialCommunityIcons
                  name="card-bulleted-off-outline"
                  size={30}
                  color={bgColor}
                />
              )}
              <Text>{userData?.status}</Text>
              <Text>Plan</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons
                name="calendar-clock-outline"
                size={30}
                color={bgColor}
              />
              <Text>Expiries In</Text>
              <Text>{planExiper} days</Text>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          {editable ? (
            <>
              {/* <TextInput
              style={styles.input}
              placeholder="Name"
              value={editName}
              onChangeText={setEditName}
            /> */}
              <TextInput
                style={styles.input}
                placeholder="Age"
                value={editAge}
                onChangeText={setEditAge}
              />
              <TextInput
                style={styles.input}
                placeholder="Height"
                value={editHeight}
                onChangeText={setEditHeight}
              />
              <TextInput
                style={styles.input}
                placeholder="Weight"
                value={editWeight}
                onChangeText={setEditWeight}
              />
              <TouchableOpacity onPress={handleSave} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.text}>Age: {userData?.age}</Text>
              <Text style={styles.text}>Height: {userData?.height}</Text>
              <Text style={styles.text}>Weight: {userData?.weight}</Text>
              <Text style={styles.text}>
                PlanExpiryDate: {userData?.planExpiryDate}
              </Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: neon,
    borderRadius: 30,
  },
  profileContainer: {
    paddingVertical: 40,
    paddingHorizontal: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: bgColor,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
  },
  profileIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 50,
    paddingBottom: 30,
  },

  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    marginTop: 20,
  },

  text: {
    color: bgColor,
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default ProfilePage;
