import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../constants/Axios';
import React, { useEffect, useState } from 'react';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBack } from '../components';

const UserProfile = (props) => {
  const user = props.route.params.user._id;
  console.log(user);
  const [userData, setUserData] = useState(null);

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(`/userProfile/${user}`);
      // console.log(response.data);
      const data = response.data.data;
      setUserData(data);
    } catch (error) {
      console.log('User Profile Error', error);
    }
  };

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const handleStatus = () => {
    const updatedStatus = 'active';
    axios
      .patch(`/userProfile/plan/${user._id}`, { status: updatedStatus })
      .then((response) => {
        const responseData = response.data;
        setUserData(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ backgroundColor: bgColor, flex: 1 }}>
      <TopBack>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontSize: 34,
            paddingVertical: 20,
          }}>
          Details of User
        </Text>
      </TopBack>
      <View style={styles.container}>
        {userData ? (
          <>
            <Text style={styles.text}>
              Name: <Text style={styles.text1}>{userData?.userId?.name}</Text>
            </Text>
            <Text style={styles.text}>
              Email: <Text style={styles.text1}>{userData?.userId?.email}</Text>
            </Text>
            <Text style={styles.text}>
              Age: <Text style={styles.text1}>{userData.age}</Text>
            </Text>
            <Text style={styles.text}>
              Height: <Text style={styles.text1}>{userData.height}</Text>
            </Text>
            <Text style={styles.text}>
              Weight: <Text style={styles.text1}>{userData.weight}</Text>
            </Text>
            <Text style={styles.text}>
              Plan:{' '}
              <Text style={styles.text1}>
                {userData.plan ? userData.plan.name : 'Plans not found'}
              </Text>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>
                Status: <Text style={styles.text1}>{userData.status}</Text>
              </Text>
              <TouchableOpacity onPress={handleStatus} style={styles.button}>
                <Text style={styles.buttonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={{ color: neon }}>No Profile Found</Text>
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
    marginVertical: 30,
  },
  text: {
    color: 'white',
    marginVertical: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  text1: {
    color: neon,
    marginVertical: 10,
    fontSize: 22,
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
});

export default UserProfile;
