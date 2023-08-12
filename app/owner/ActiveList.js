import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { GradientBG, Hr, TopBack } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgGlass, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const ActiveList = (props) => {
  const [inactiveData, setInactiveData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const gymId = user.gymId;
      const response = await axios.get(`/userProfile/${gymId}/active`);
      const data = await response.data.data;
      setInactiveData(data);

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Data not found');
        setInactiveData([]);
      } else {
        console.error('Error fetching activelist data:', error);
      }
      setLoading(false);
    }
  };

  const handleUserPress = async (member) => {
    const user = member.userId;
    props.navigation.navigate('UserProfile', { user });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>Active Members</TopBack>
        <ScrollView style={styles.scroll}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <View style={styles.scrollContainer}>
              <View style={styles.userHeader}>
                <Text style={styles.userText}>Name</Text>
                <Text style={styles.userText1}>ID</Text>
              </View>
              {inactiveData.length > 0 ? (
                inactiveData.map((member, index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={styles.dataContainer}
                      onPress={() => handleUserPress(member)}>
                      <View style={styles.flexRow}>
                        <View style={styles.flexRow}>
                          <Image
                            source={require('../assets/images/profile.jpg')}
                            style={{
                              width: 35,
                              height: 35,
                              borderRadius: 50,
                              marginRight: 10,
                            }}
                          />
                          <Text style={styles.dataItem1}>
                            {member?.userId?.name}
                          </Text>
                        </View>
                        <Text style={styles.dataItem1}>
                          {member?.userId?.registerationNumber}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Hr />
                  </View>
                ))
              ) : (
                <Text>No inactive members found.</Text>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: bgColor,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userText: {
    fontSize: 24,
    color: 'white',
  },
  userText1: {
    fontSize: 24,
    color: neon,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  dataContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: bgGlass,
    borderRadius: 10,
  },
  dataItem: {
    color: 'white',
    fontSize: 18,
  },
  dataItem1: {
    color: neon,
    fontSize: 18,
  },
  editButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ActiveList;
