import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const InactiveList = () => {
  const [activeData, setActiveData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const Id = user.gymId;
      console.log(Id);
      const response = await axios.get(`/userProfile/${Id}/active`);
      const data = await response.data;
      console.log(data);
      setActiveData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{flex:1, backgroundColor: bgColor }}>
      <View style={{marginTop:20,alignItems:'center'}}>
        <Text style={styles.heading}>Inactive Members</Text>
      </View>
        <ScrollView>
            {loading ? (
            <ActivityIndicator size="large" />
            ) : activeData ? (
            <View style={styles.dataContainer}>
                <Text style={styles.dataItem}>Name: {activeData.name}</Text>
                <Text style={styles.dataItem}>Age: {activeData.age}</Text>
            </View>
            ) : (
                <View style={styles.dataContainer}>
                    <Text style={{color:neon,fontSize:20}}>No data available</Text>
                </View>
            )}
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"white",
    
  },
  dataContainer: {
    padding: 16,
    backgroundColor:bgLight,
    margin:20,
    borderRadius:25,
  },
  dataItem: {
    marginBottom: 8,
    color:neon,
  },
});

export default InactiveList;
