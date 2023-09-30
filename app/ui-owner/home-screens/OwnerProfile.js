import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { GradientBG, Hi, TopBack } from '../../components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, neon, bgLight } from '../../constants/Constants';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState(' ');

  const fetchUserProfileData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const userID = user?.gymId;
      const response = await axios.get(`/gym/${userID}`);
      const data = await response.data;
      setUserData(data.data);
    } catch (error) {
      console.log('owner Profile data fetch Error', error);
    }
  };

  const getCheckIn = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/gym/mems/${gymId}`);
      const data = response.data;
      setUsers(data.data.members.length);
    } catch (error) {
      console.log('Owner Home checkedIN', error);
    }
  };

  useEffect(() => {
    getCheckIn();
    fetchUserProfileData();
  });

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
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Owner Profile</TopBack>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.profileCard}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../../assets/images/profile.jpg')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text style={styles.userName}>{userData?.gymName}</Text>
              {/* <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 16,
                color: bgLight,
              }}>
              {userData?.email}
            </Text> */}
            </View>
            <View style={styles.profileIcons}>
              <View style={styles.infoBox}>
                <MaterialCommunityIcons
                  name="card-bulleted-outline"
                  size={30}
                  color={bgColor}
                />
                <Text>Plans</Text>
                <Text>{userData?.plans.length}</Text>
              </View>
              <View style={styles.infoBox}>
                <MaterialCommunityIcons
                  name="clipboard-outline"
                  size={30}
                  color={bgColor}
                />
                <Text>Gym.Id</Text>
                <Text>{userData?.gymId}</Text>
              </View>
              <View style={styles.infoBox}>
                <MaterialCommunityIcons
                  name="calendar-clock-outline"
                  size={30}
                  color={bgColor}
                />
                <Text>Users</Text>
                <Text>{users}</Text>
              </View>
            </View>
          </View>

          <View style={styles.planCard}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: bgColor }}>
              Plan Details
            </Text>

            {userData?.plans.map((item, index) => {
              return (
                <View key={index}>
                  <View style={styles.plaContainer}>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: bgLight }}>
                        Plan Name
                      </Text>
                      <Text style={{ fontSize: 16, color: bgColor }}>
                        {item.name}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: bgLight }}>
                        Plan Price
                      </Text>
                      <Text style={{ fontSize: 16, color: bgColor }}>
                        {item.price}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ fontSize: 16, color: bgLight }}>
                        Plan Days
                      </Text>
                      <Text style={{ fontSize: 16, color: bgColor }}>
                        {item.validity}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: bgColor,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  infoBox: {
    alignItems: 'center',
    borderColor: bgColor,
    width: '30%',
    borderWidth: 2,
    padding: 10,
    borderRadius: 30,
  },
  planCard: {
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    borderRadius: 20,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginBottom: 80,
  },
  profileIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  plaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
});

export default ProfilePage;
