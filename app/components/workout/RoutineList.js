import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Axios, GetUser } from '../../functoins';
import CardList from './CardList';

const RoutineList = (props) => {
  const [data, setData] = useState([]);

  const getRoutine = async () => {
    const user = await GetUser();
    try {
      const res = await Axios.get(`/routine/name/all/${user.gymId}`);
      setData(res.data.data);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getRoutine();
  }, []);

  return (
    <>
      {data.length > 0 && (
        <CardList
          screen="ExerciseCards"
          data={data}
          navigation={props.navigation}
        />
      )}
    </>
  );
};

export default RoutineList;
