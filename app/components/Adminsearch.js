import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { bgColor, bgLight, neon } from '../constants/Constants';
import axios from '../constants/Axios';

const Adminsearch = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [done, setdone] = useState(false);

  const handleSearch = async () => {
    try {
      setdone(true);
      const response = await axios.get(`/gym/${search}`);
      const dataArray = response.data.data;
      setData(dataArray);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
        <TextInput
          style={styles.input}
          placeholder="Gym ID"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {data !== null ? (
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.rowTextheading}>
              Gym Name: <Text style={styles.rowTextanswer}>{data.gymName}</Text>
            </Text>
            <Text style={styles.rowTextheading}>
              Owner Name: <Text style={styles.rowTextanswer}>{data.owner}</Text>
            </Text>
            <Text style={styles.rowTextheading}>
              Email: <Text style={styles.rowTextanswer}>{data.email}</Text>
            </Text>
            <Text style={styles.rowTextheading1}>
              GymId: <Text style={styles.rowTextanswer1}>{data.gymId}</Text>
            </Text>
          </View>
        </View>
      ) : (
        <View>
          {done && (
            <View style={styles.rowContainer}>
              <Text style={styles.dataNotFoundText}>Data not found</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 20,
    backgroundColor: bgLight,
    borderRadius: 40,
    width: 150,
    marginLeft: 20,
    marginBottom: 50,
    alignSelf: 'center',
  },
  userContainer1: {
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 50,
    width: 200,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: 250,
  },
  rowContainer: {
    backgroundColor: 'yellow',
    padding: 20,
    borderRadius: 20,
    marginTop: 30,
    width: 350,
    marginBottom: 30,
  },
  rowTextheading: {
    color: bgColor,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  },
  rowTextanswer: {
    color: bgColor,
    fontSize: 20,
    fontWeight: 'bold',
  },
  rowTextheading1: {
    color: bgColor,
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 20,
  },
  rowTextanswer1: {
    color: bgColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: bgLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    marginLeft: 20,
  },
  searchButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: neon,
  },
});

export default Adminsearch;
