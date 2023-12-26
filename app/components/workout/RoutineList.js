import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Axios, GetUser } from '../../functoins';
import CardList from './CardList';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const RoutineList = (props) => {
  const [data, setData] = useState([]);
  const [pRoutine, SetPRoutine] = useState([]);
  const lottieRef = useRef(null);

  const getRoutines = async () => {
    const user = await GetUser();
    try {
      const storedData = await AsyncStorage.getItem('routines');

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData);
      } else {
        const res = await Axios.get(`/routine/name/all/${user.gymId}`);
        setData(res.data.data);
        await AsyncStorage.setItem('routines', JSON.stringify(res.data.data));
      }
      const pRes = await Axios.get(`/routine/name/specific/${user.userId}`);
      SetPRoutine(pRes.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleRefresh = async () => {
    if (lottieRef.current) {
      lottieRef.current.reset();
    }
    if (lottieRef.current) {
      lottieRef.current.play();
    }
    await AsyncStorage.removeItem('routines');
    getRoutines();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getRoutines();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  // useEffect(() => {
  //   getRoutines();
  // }, []);

  return (
    <>
      {pRoutine.length > 0 && (
        <>
          <View style={styles.row}>
            <Text style={styles.heading}>My Routines</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <LottieView
                ref={lottieRef}
                source={require('../../assets/lottieFiles/refresh.json')}
                autoPlay
                loop={false}
                style={{ width: 35, height: 35, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <CardList
            screen="ExerciseCards"
            data={pRoutine}
            navigation={props.navigation}
            routine="user"
          />
        </>
      )}

      {data.length > 0 && (
        <>
          <View style={styles.row}>
            <Text style={styles.heading}>Trainer Routines</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <LottieView
                ref={lottieRef}
                source={require('../../assets/lottieFiles/refresh.json')}
                autoPlay
                loop={false}
                style={{ width: 35, height: 35, marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <CardList
            screen="ExerciseCards"
            data={data}
            navigation={props.navigation}
            routine="owner"
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
    marginHorizontal: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 5,
  },
});

export default RoutineList;
