import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import TopBack from '../components/TopBack';
import GradientBG from '../components/GradientBG';
import { neon, bgLight, bgColor } from '../constants/Constants';
import axios from '../constants/Axios';
import * as SecureStore from 'expo-secure-store';

const Notification = () => {
  const [inactiveData, setInactiveData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
    //   console.log(user.gymId)
    //   console.log(user.userId)
      const responseInactive = await axios.get(`/noti/${user.gymId}`);
      const responsePersonal = await axios.get(`/noti/spec/${user.gymId}/${user.userId}`);

      setInactiveData(responseInactive.data.data);
      setPersonalData(responsePersonal.data.data);
      // console.log(responseInactive.data);
      // console.log(responsePersonal.data);

      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log('Data not found');
      } else {
        console.error('Error fetching notification data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderNotifications = (data) => {
    return data.map((message, index) => (
      <View key={index} style={styles.dataContainer} style={styles.containerdata}>
        <Text style={styles.dataItem1}>{message.content}</Text>
        <View style={styles.dataContainer1}>
        <Text style={styles.dataItem2}>{message.day}</Text>
        <View>
          <Text style={styles.dataItem2}>{message.time}</Text>
        </View>
        {/* <Text style={styles.dataItem2}>{message.gymId}</Text> */}
        </View>
        <View style={styles.separator} />
      </View>
    ));
  };

  return (
    <GradientBG>
      <View style={{ flex: 1, marginTop: 40 }}>
        <TopBack>Notification</TopBack>
        <ScrollView>
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              <View style={{backgroundColor:bgColor,borderRadius:15,margin:15,paddingBottom:15}}>
                <Text style={styles.text1}>Announcements</Text>
                {inactiveData.length > 0 ? renderNotifications(inactiveData) : (
                    <View style={{ alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: neon, fontSize: 20 }}>No Inactive Messages</Text>
                    </View>
                )}
              </View>
              <View style={{backgroundColor:bgColor,borderRadius:15,margin:15,marginBottom:85}}>
              <Text style={{ color: neon, fontSize: 20, fontWeight:'bold' ,marginTop: 20, marginBottom: 10,marginLeft:20,marginTop:15,textAlign:'center' }}>Personal Notification</Text>
              {personalData.length > 0 ? renderNotifications(personalData) : (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                  <Text style={{ color: neon, fontSize: 20 }}>No Personal Messages</Text>
                </View>
              )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  dataContainer: {
    padding: 10,
    borderRadius: 15,
    margin: 15,
  },
  text1:{
    color: neon, 
    fontSize: 20,
    fontWeight:'bold', 
    marginBottom: 10,
    marginLeft:20,
    marginTop:15,
    textAlign:'center'
  },
  dataContainer1: {
    paddingTop:10,
    borderRadius: 15,
    margintop: 15, 
    flexDirection:'row',
    justifyContent: 'space-between',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop:5
  },
  dataItem1: {
    color: "white",
    fontSize: 18,
    marginBottom:10,
  },
  dataItem2: {
    color: "white",
    fontSize: 12,
    
  },
  containerdata: {
    backgroundColor:bgColor,
    marginBottom:10,
    borderRadius:20,
    padding:15
  },
});

export default Notification;
