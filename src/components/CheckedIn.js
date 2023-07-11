import React,{useEffect,useState} from 'react'
import {View, 
        Text, 
        StyleSheet} from 'react-native'
import axios from '../constants/Axios';
import { bgColor, bgLight, neon } from '../constants/Constants';


const CheckedIn = () => {
  const [users, setUsers] = useState([]);

  const getCheckIn = async () => {
    try{
        const response = await fetch('http://192.168.29.77:7000/api/v1/gym/2');
        const data = await response.json();
        setUsers(data.data.members);
        alert(data.data.members);
    }
    catch(error){
      {
        alert('Error: ' + error.message);
      }
    }
  };

  useEffect(() => {
    getCheckIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>CheckIn Users</Text>
      <View style={{backgroundColor:bgColor}}>
      {users.map((user) => (
        <View key={user._id}>
          <View style={styles.userContainer}>
            <Text style={styles.userText}>✔️{user.name}</Text>
          </View>
          
        </View>
      ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bgColor,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: neon,
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  userText: {
    fontSize: 20,
    color: neon,
  },
});

export default CheckedIn
