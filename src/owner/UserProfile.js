import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../constants/Axios';
import React, { useEffect, useState } from 'react';
import { bgColor, bgLight, neon } from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const UserProfile = (props) => {
  const user = props.route.params.user;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserProfileData();
  }, []);

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(`/userProfile/${user._id}`);
      const data = response.data.data;
      console.log('User Profile Data', data);
      setUserData(data);
    } catch (error) {
      console.log('User Profile Error', error);
      
    }
  };

  const handleStatus = () => {
    const updatedStatus = userData.status === 'active' ? 'inactive' : 'active';

    axios
      .patch(`/userProfile/${userData._id}`, { status: updatedStatus })
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
      <Text
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: 24,
          paddingVertical: 20,
        }}>
        Details of User
      </Text>
      <View style={styles.container}>
        {userData ? (
          <>
            <Text style={styles.text}>Name:  {user.name}</Text>
            <Text style={styles.text}>Age:  {userData.age}</Text>
            <Text style={styles.text}>Height:  {userData.height}</Text>
            <Text style={styles.text}>Weight:  {userData.weight}</Text>
            <Text style={styles.text}>
                    Plan: {userData.plan ? userData.plan.name : "Plans not found"}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Status: {userData.status}</Text>
              <TouchableOpacity onPress={handleStatus} style={styles.button}>
                <Text style={styles.buttonText}>Click Me</Text>
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
});

export default UserProfile;
