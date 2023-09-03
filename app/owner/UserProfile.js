import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import axios from '../constants/Axios';
import React, { useEffect, useState } from 'react';
import { bgColor, bgLight, neon, bgGlass } from '../constants/Constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBack, GradientBG, Hr } from '../components';

const UserProfile = (props) => {
  const user = props.route.params.user._id;
  const [userData, setUserData] = useState(null);
  const [planExiper, setPlanExiper] = useState(null);

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(`/userProfile/${user}`);
      const data = response.data.data;
      //console.log('User Profile Data', data);
      setUserData(data);
    } catch (error) {
      console.log('Checked In Users Error', error);
    }
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

  const handleStatus = () => {
    const updatedStatus = 'active';
    axios
      .patch(`/userProfile/plan/${user}`, { status: updatedStatus })
      .then((response) => {
        const responseData = response.data;
        setUserData(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <GradientBG style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>User Profile</TopBack>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.profileCard}>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/images/profile.jpg')}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
              <Text style={styles.userName}>{userData?.userId?.name}</Text>
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
                <Text>{planExiper}d</Text>
              </View>
            </View>
          </View>
          <Hr />

          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={styles.smContainer}>
                <Text>Height </Text>
                <Text style={styles.smHeader}>{userData?.height}</Text>
                <Text style={{ fontSize: 12 }}>cms</Text>
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

            {userData?.status == 'inactive' ? (
              <View style={styles.editContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.editHeader}>Activate the plan</Text>
                  <TouchableOpacity
                    onPress={handleStatus}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Activate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </>
          <Hr />
          <View style={styles.bottomContainer1}>
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
          <View style={styles.bottomContainer}>
            <Text style={styles.smHeader}>Profile Details:</Text>
            <Text style={styles.text}>Address: {userData?.address}</Text>
            <Text style={styles.text}>
              Contact:{' '}
              {userData?.phoneNumber ? userData.phoneNumber : 'Not submitted'}
            </Text>
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
    paddingHorizontal: 80,
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
    marginTop: 10,
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
    height: 180,
    minWidth: '33%',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 30,
    marginTop: 10,
    padding: 20,
    borderColor: bgColor,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  smHeader: {
    fontSize: 38,
    fontWeight: 'bold',
    paddingVertical: 15,
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
    marginBottom: 100,
  },
  bottomContainer1: {
    padding: 20,
    backgroundColor: '#4FC0D0',
    borderRadius: 30,
    marginTop: 10,
    borderColor: '#164B60',
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  text: {
    color: 'black',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: '#ffffff66',
    borderRadius: 30,
    marginTop: 10,
    paddingRight: 10,
    borderColor: bgColor,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  editHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: bgColor,
  },
  button: {
    backgroundColor: bgColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
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
});

export default UserProfile;
