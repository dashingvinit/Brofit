import React, { useState,useEffect } from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Top from '../components/Top';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';

const AdminPage = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [gymName, setgymName] = useState('');
  const [gymId, setGymId] = useState('');
  const [email, setEmail] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [owner, setowner] = useState('');
  const [data, setData] = useState([]);
  const [length, setlength] = useState('');
  const handleAddGym = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    const formData = {
      gymName,
      gymId,
      email,
      latitude,
      longitude,
      owner,
    };
  
    axios
      .post('/gym', formData, {
        headers: {
          'Content-Type': 'application/json', // Remove the extra space here
        },
      })
      .then((response) => {
        if (response.status===201) { // Check for the correct status code
          alert('Gym added successfully!');
          setShowForm(false);
          setgymName('');
          setGymId('');
          setEmail('');
          setLatitude('');
          setLongitude('');
          setowner('');
        } else {
          alert('Failed to add gym.');
        }
      })
      .catch((error) => {
        alert('An error occurred. Please try again.');
      });
  };

  const fetchdata = async() => {
      try{
        const response = await axios.get('/gym')
        const dataArray = response.data.data;
        setData(dataArray[dataArray.length - 1]);
        setlength(dataArray.length);
      }catch(error){
        console.log(error);
      }
  }

  useEffect(() => {
    fetchdata();
  }, []);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <Top
        navigation={props.navigation}
        setHandleLogout={props.setHandleLogout}
      />
      <ScrollView>
      <View style={styles.container}>
        <Text style={styles.heading}>Admins</Text>
        <TouchableOpacity onPress={handleAddGym} style={styles.userContainer}>
            <Text style={styles.userText}>Add Gym</Text>
          </TouchableOpacity>
        {!showForm && (
          <View style={{marginTop:30}}>
            {data && (
              <View>
                <View>
                  <View style={{alignItems:'center'}}>
                    <View style={{backgroundColor:bgLight,height:40,width:250,alignItems:'center',justifyContent:'center',borderRadius:10}}>
                        <Text style={{fontSize:24,color:neon}}>Latest gym added</Text>
                    </View>
                  </View>
                  <View style={styles.rowContainer}>
                    <View>
                      <Text style={styles.rowTextheading}>Gym Name: <Text style={styles.rowTextanswer}>{data.gymName}</Text></Text>
                      <Text style={styles.rowTextheading}>Owner Name: <Text style={styles.rowTextanswer}>{data.owner}</Text></Text>
                      <Text style={styles.rowTextheading}>Email: <Text style={styles.rowTextanswer}>{data.email}</Text></Text>
                    </View>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.rowContainer1}>
                    <Text style={styles.rowTextheading1}>GymId: <Text style={styles.rowTextanswer1}>{data.gymId}</Text></Text>
                  </View>
                  <View style={styles.rowContainer1}>
                    <Text style={styles.rowTextheading1}>Total Gyms: <Text style={styles.rowTextanswer1}>{length}</Text></Text>
                  </View>
                </View>
              </View>
            )} 
          </View>
        )}

        {showForm && (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="gymName"
              value={gymName}
              onChangeText={setgymName}
            />
            <TextInput
              style={styles.input}
              placeholder="Gym ID"
              value={gymId}
              onChangeText={setGymId}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Latitude"
              value={latitude}
              onChangeText={setLatitude}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Longitude"
              value={longitude}
              onChangeText={setLongitude}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="owner"
              value={owner}
              onChangeText={setowner}
            />
            <View style={{alignItems:'center',marginTop:10}}>
              <TouchableOpacity
                onPress={handleFormSubmit}
                style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems:'center'
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 20,
    backgroundColor: bgLight,
    borderRadius: 40,
    width: 150,
    marginLeft:20,
    marginBottom:50
  },
  userContainer1: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 50,
    width: 200,
  },
  heading1: {
    fontSize: 14,
    color: neon,
  },
  userText: {
    fontSize: 20,
    color: neon,
  },
  formContainer: {
    marginTop: 20,
    backgroundColor: bgLight,
    borderRadius: 10,
    padding: 20,
    width: '95%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: bgColor,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    width:150,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: neon,
  },
  rowContainer: {
    backgroundColor:"yellow",
    padding:20,
    borderRadius: 20,
    marginTop:30,
    width: '95%',
    marginBottom:30,
  },
  rowContainer1: {
    backgroundColor:"yellow",
    padding:20,
    borderRadius: 15,
    marginHorizontal:5,
    marginBottom:20,
    width: 170,
  },
  rowTextheading:{
      color:bgColor,
      fontSize:20,
      fontWeight:'bold',
      marginRight:10,
      marginBottom: 20,
  },
  rowTextanswer: {
      color:bgColor,
      fontSize:20,
      fontWeight:'bold',
  },
  rowTextheading1:{
    color:bgColor,
    fontSize:18,
    fontWeight:'bold',
    marginRight:10,
    marginBottom: 20,
},
rowTextanswer1: {
    color:bgColor,
    fontSize:18,
    fontWeight:'bold',
},
});

export default AdminPage;
