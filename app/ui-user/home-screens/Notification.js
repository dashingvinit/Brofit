import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { TopBack } from '../../components';
import { GradientBG } from '../../components/containers';
import { neon, bgGlass, bgColor } from '../../constants/Constants';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';

const Notification = () => {
  const [inactiveData, setInactiveData] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Announcements');

  const fetchData = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      const user = JSON.parse(userString);
      const responseInactive = await axios.get(`/noti/${user.gymId}`);
      const responsePersonal = await axios.get(
        `/noti/spec/${user.gymId}/${user.userId}`
      );

      setInactiveData(responseInactive.data.data);
      setPersonalData(responsePersonal.data.data);

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
      <TouchableOpacity key={`message-${index}`}>
        <View key={`container-${index}`} style={styles.containerdata}>
          <Image
            source={require('../../assets/images/announcement.jpg')}
            style={styles.img}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.dataItem1}>{message.content}</Text>
            <View style={styles.dataContainer1}>
              <Text style={styles.dataItem2}>{message.day}</Text>
              <Text style={styles.dataItem2}>{message.time}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separator} key={`separator-${index}`} />
      </TouchableOpacity>
    ));
  };

  return (
    <GradientBG>
      <SafeAreaView />
      <TopBack>Notification</TopBack>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginLeft:20,marginRight:20,marginTop:20}}>
        <TouchableOpacity onPress={()=>setActiveTab('Announcements')} style={activeTab === 'Announcements' && styles.activeTab}>
          <Text style={[styles.text1, activeTab === 'Announcements' && styles.activeTabtext]}>Announcements</Text>
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=>setActiveTab('PersonalNotify')} style={activeTab === 'PersonalNotify' && styles.activeTab}>
          <Text style={[styles.notificationTitle, activeTab === 'PersonalNotify' && styles.activeTabtext]}>Personal Notify</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.scrollContainer}>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            <>
              {activeTab==='Announcements' && (
                <View style={styles.notificationContainer}>
                  {/* <View style={styles.separator} /> */}
                  {inactiveData.length > 0 ? (
                    renderNotifications(inactiveData)
                  ) : (
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noDataText}>No Announcements</Text>
                    </View>
                  )}
                </View>
              )}

              {/* for persnal notify */}
              {activeTab==='PersonalNotify' && (
                <View style={styles.notificationContainer}>
                  {personalData.length > 0 ? (
                    renderNotifications(personalData)
                  ) : (
                    <View style={styles.noDataContainer}>
                      <Text style={styles.noDataText}>No new notification</Text>
                    </View>
                  )}
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    marginLeft: 10,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  text1: {
    color: neon,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dataContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 5,
  },
  dataItem1: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  dataItem2: {
    color: 'white',
    fontSize: 12,
  },
  containerdata: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  scrollContainer: {
    margin: 10,
  },
  notificationContainer: {
    borderRadius: 15,
    marginVertical: 10,
    padding: 10,
  },
  noDataContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noDataText: {
    color: neon,
    fontSize: 20,
  },
  notificationTitle: {
    color: neon,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor:bgColor,
    padding:10,
    borderRadius:20,
  },
  activeTabtext:{
    color:'white',
  }
});

export default Notification;
