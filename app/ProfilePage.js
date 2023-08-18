import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import { GradientBG, Hr, Hi, UserDelete } from './components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  bgColor,
  neon,
  bgLight,
  bgGlassLight,
  bgGlass,
} from './constants/Constants';
import axios from './constants/Axios';
import * as SecureStore from 'expo-secure-store';
import MsgModal from './components/MsgModal';

const ProfilePage = (props) => {
  const [userData, setUserData] = useState(null);
  const [username, setUsername] = useState(null);
  const [editable, setEditable] = useState(false);
  // const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editHeight, setEditHeight] = useState('');
  const [editWeight, setEditWeight] = useState('');
  const [Id, setId] = useState('');
  const [planExiper, setPlanExiper] = useState(null);
  const [msg, setmsg] = useState(false);
  const [editContact, setEditContact] = useState('');
  const [editAddress, setEditAddress] = useState('');

  const fetchUserProfileData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      setUsername(user.name);
      const userID = user?.userId || user?._id;
      // console.log('User ID', userID);
      const response = await axios.get(`/userProfile/${userID}`);
      const data = await response.data;
      //  console.log('User Profile Data', response.data);
      setUserData(data.data);
      setId(data.data._id);
    } catch (error) {
      console.log('User Profile data fetch Error', error);
    }
  };

  const handleEdit = () => {
    setEditable(true);
    // setEditName(username);
    setEditAge(userData.age.toString()); // Convert to string for TextInput
    setEditHeight(userData.height.toString()); // Convert to string for TextInput
    setEditWeight(userData.weight.toString()); // Convert to string for TextInput
    setEditContact(userData.phoneNumber);
    setEditAddress(userData.address);
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        age: parseFloat(editAge),
        height: editHeight,
        weight: editWeight,
        phoneNumber: editContact,
        address: editAddress,
      };

      await axios.patch(`/userProfile/${Id}`, updatedData);
      fetchUserProfileData();
      setEditable(false);
    } catch (error) {
      console.log('Update Profile Error', error);
    }
    setmsg(true);
  };

  const getDifferenceInDays = async (dateString) => {
    if (!dateString) return null;

    const [day, month, year] = dateString.split('-').map(Number);
    const givenDate = new Date(year, month - 1, day);
    if (isNaN(givenDate.getTime())) return null;
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = givenDate - currentDate;
    const differenceInDays = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setPlanExiper(differenceInDays);
    return differenceInDays;
  };

  useEffect(() => {
    const fetchAndCalculatePlanExpiry = async () => {
      fetchUserProfileData();
      const givenDateString = userData?.planExpiryDate;

      if (userData && givenDateString) {
        const differenceInDays = await getDifferenceInDays(givenDateString);
        setPlanExiper(differenceInDays);
      }
    };
    fetchAndCalculatePlanExpiry();
  }, [userData?.planExpiryDate]);

  useEffect(() => {
    if (msg) {
      const timeout = setTimeout(() => {
        setmsg(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [msg]);

  const formattedUpdatedAt = userData?.updatedAt
    ? new Date(userData.updatedAt).toISOString().split('T')[0]
    : '';
  const formattedcreatedAt = userData?.createdAt
    ? new Date(userData.createdAt).toISOString().split('T')[0]
    : '';

  if (!userData)
    return (
      <GradientBG style={{ flex: 1 }}>
        <View style={styles.profileCard}>
          <Hi />
        </View>
      </GradientBG>
    );

  return (
    <GradientBG style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.profileCard}>
          <View style={styles.profileContainer}>
            <Image
              source={require('./assets/images/profile.jpg')}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
            <Text style={styles.userName}>{username}</Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16,
                color: bgLight,
              }}>
              {userData?.userId.email}
            </Text>
          </View>
          <View style={styles.profileIcons}>
            <View
              style={{
                alignItems: 'center',
                borderColor: bgColor,
                width: '30%',
                borderWidth: 2,
                padding: 10,
                borderRadius: 30,
              }}>
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
                  color={bgGlass}
                />
              )}
              <Text>{userData?.status}</Text>
              <Text>Plan</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                borderColor: bgColor,
                width: '30%',
                borderWidth: 2,
                padding: 10,
                borderRadius: 30,
              }}>
              <MaterialCommunityIcons
                name="clipboard-outline"
                size={30}
                color={bgColor}
              />
              <Text>Reg.Id</Text>
              <Text>{userData?.userId.registerationNumber}</Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                borderColor: bgColor,
                width: '30%',
                borderWidth: 2,
                padding: 10,
                borderRadius: 30,
              }}>
              <MaterialCommunityIcons
                name="calendar-clock-outline"
                size={30}
                color={bgColor}
              />
              <Text>Exp.In</Text>
              <Text>{planExiper} d</Text>
            </View>
          </View>
        </View>
        <Hr />

        {editable ? (
          <>
            <View style={styles.container}>
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
              <TextInput
                style={styles.input}
                placeholder="Contact"
                value={editContact}
                onChangeText={setEditContact}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={editAddress}
                onChangeText={setEditAddress}
              />
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  onPress={() => setEditable(false)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSave} style={styles.button}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={styles.smContainer}>
                <Text>Height</Text>
                <Text style={styles.smHeader}>{userData?.height}</Text>
                <Text style={{ fontSize: 12 }}>Feet</Text>
              </View>
              <View style={styles.smContainer}>
                <Text>Weight</Text>
                <Text style={styles.smHeader}>{userData?.weight}</Text>
                <Text style={{ fontSize: 12 }}>KG</Text>
              </View>
              <View style={styles.smContainer}>
                <Text>Age</Text>
                <Text style={styles.smHeader}>{userData?.age}</Text>
                <Text style={{ fontSize: 12 }}>Yrs</Text>
              </View>
            </View>

            <View style={styles.editContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingVertical: 10,
                }}>
                <View style={{ paddingVertical: 20 }}>
                  <Text style={styles.editHeader}>Edit Profile Settings</Text>
                  <Text style={styles.editText}>
                    last updated: {formattedUpdatedAt}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleEdit} style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        <Hr />
        <View style={styles.bottomContainer}>
          <Text style={styles.smHeader}>Plan details:</Text>
          <Text style={styles.text}>
            Plan Expires: {userData?.planExpiryDate}
          </Text>
          <Text style={styles.text}>
            Plan: {userData?.plan ? userData.plan.name : 'Plans not found'}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.text}>Status: {userData?.status}</Text>
          </View>
        </View>
        <Hr />
        <View style={styles.bottomContainer2}>
          <Text style={styles.smHeader}>Account details</Text>
          <Text style={styles.text}>Address: {userData?.address}</Text>
          <Text style={styles.text}>Phone: {userData?.phoneNumber}</Text>
          <Text style={styles.text}>Member since: {formattedcreatedAt}</Text>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <UserDelete
              navigation={props.navigation}
              setHandleLogout={props.setHandleLogout}
            />
          </View>
        </View>
        <Modal visible={msg} transparent onRequestClose={() => setmsg(false)}>
          <MsgModal message={'Profile Updated 😉'} />
        </Modal>
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: neon,
    borderRadius: 30,
    borderColor: bgColor,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  profileContainer: {
    paddingBottom: 30,
    paddingTop: 50,
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
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff66',
    borderRadius: 30,
    marginVertical: 10,
  },
  input: {
    color: '#AAC8A7',
    backgroundColor: '#FAF3F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  smContainer: {
    backgroundColor: '#F8FFDB',
    height: 200,
    width: 125,
    marginHorizontal: 10,
    borderRadius: 30,
    marginTop: 10,
    padding: 20,
    alignItems: 'flex-start',
    borderColor: bgColor,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  smHeader: {
    fontSize: 38,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  editContainer: {
    backgroundColor: '#ffffff66',
    borderRadius: 30,
    marginVertical: 10,
    borderColor: bgColor,
    borderBottomWidth: 3,
  },
  editHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: bgColor,
  },
  editText: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: 'grey',
  },
  button: {
    backgroundColor: bgColor,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: neon,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#1B6B93',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: bgColor,
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  text: {
    color: 'black',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomContainer2: {
    padding: 20,
    backgroundColor: '#4FC0D0',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 100,
    borderColor: '#164B60',
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
});

export default ProfilePage;
