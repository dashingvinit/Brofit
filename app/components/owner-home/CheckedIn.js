import React, { useEffect, useState, useRef } from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from '../../constants/Axios';
import LoadingSkeleton from '../loading-animations/LoadingSkeleton';
import {
  bgColor,
  bgGlass,
  bgGlassLight,
  neon,
} from '../../constants/Constants';
import LottieView from 'lottie-react-native';

const CheckedIn = (props) => {
  const [usersData, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const lottieRef = useRef(null);

  const getCheckIn = async () => {
    try {
      setLoading(true);
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/attendance/${gymId}`);
      const data = response.data;
      // console.log('Owner Home checkedIN', data);
      setLoading(false);
      setUsers(data.data);
    } catch (error) {
      console.log('Owner Home checkedIN', error);
    }
  };

  const handleRefresh = () => {
    if (lottieRef.current) {
      lottieRef.current.reset();
    }
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    getCheckIn();
  };

  const handleUserPress = async (member) => {
    const user = member.userId;
    props.navigation.navigate('UserProfile', { user });
  };

  useEffect(() => {
    getCheckIn();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={styles.heading}>Today's Check-Ins</Text>

        <TouchableOpacity onPress={handleRefresh} style={styles.refresh}>
          <LottieView
            ref={lottieRef}
            source={require('../../assets/lottieFiles/refresh.json')}
            autoPlay
            loop={false} // Set loop to false initially
            style={{ width: 35, height: 35, alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.userListContainer}>
        <View style={styles.userHeader}>
          <Text style={styles.userName}>ID. Name</Text>
          <Text style={styles.checkInOut}>Check-In</Text>
          <Text style={styles.checkInOut}>Check-Out</Text>
        </View>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {usersData.map((member, index) => (
              <TouchableOpacity
                key={index}
                style={styles.userItem}
                onPress={() => handleUserPress(member)}>
                <Text style={styles.userNameText}>
                  {member.userId.registerationNumber}.{' '}
                  <Text style={styles.userNameText}>{member.userId.name}</Text>
                </Text>

                <Text style={styles.checkTime}>{member.checkIn}</Text>
                <Text style={styles.checkTime}>{member.checkOut}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    borderRadius: 20,
    backgroundColor: bgGlass,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    marginLeft: 10,
  },
  refresh: {
    marginRight: 10,
  },
  userListContainer: {
    backgroundColor: bgGlassLight,
    borderRadius: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 15,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: bgColor,
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 2,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#E8FFCE',
  },
  userName: {
    flex: 1,
    fontWeight: 'bold',
    color: neon,
    fontSize: 16,
  },
  checkInOut: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  userNameText: {
    flex: 1,
    fontWeight: 'bold',
    color: '#17594A',
    fontSize: 16,
    marginLeft: 0,
  },
  checkTime: {
    flex: 1,
    textAlign: 'center',
    color: '#17594A',
    fontSize: 16,
  },
});

export default CheckedIn;
