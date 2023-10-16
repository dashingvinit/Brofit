import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Axios, GetUser } from '../../functoins';
import CardList from './CardList';

const RoutineList = (props) => {
  const [data, setData] = useState([]);
  const [pRoutine, SetPRoutine] = useState([]);

  const getRoutines = async () => {
    const user = await GetUser();
    try {
      const res = await Axios.get(`/routine/name/all/${user.gymId}`);
      const pRes = await Axios.get(`/routine/name/specific/${user.userId}`);

      setData(res.data.data);
      SetPRoutine(pRes.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <>
      {pRoutine.length > 0 && (
        <>
          <Text style={styles.heading}>Personal Routines</Text>
          <View style={styles.separator} />
          <CardList
            screen="ExerciseCards"
            data={pRoutine}
            navigation={props.navigation}
          />
        </>
      )}

      {data.length > 0 && (
        <>
          <Text style={styles.heading}>Owner Routines</Text>
          <View style={styles.separator} />
          <CardList
            screen="ExerciseCards"
            data={data}
            navigation={props.navigation}
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
    textAlign: 'center',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    marginHorizontal: 7,
  },
});

export default RoutineList;
