import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { GradientBG, TopBack, CardList, SearchBox } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from '../../functoins/Axios';

const ExerciseList = (props) => {
  const { item, data } = props.route.params;
  const [listData, setListData] = useState([]);

  const handleSearch = (searchData) => {
    setListData(searchData);
  };

  const workouts = [
    '5f9e1b1b9d3e9c0017e9e0a0',
    '5f9e1b1b9d3e9c0017e9e0a1',
    '5f9e1b1b9d3e9c0017e9e0a2',
  ];

  const getExercise = async (id) => {
    const response = await Axios.get(`/routine/content/${id}/monday/`);
    console.log('get', response.data);
  };

  const addExercise = async (id) => {
    const response = await Axios.patch(`/routine/${id}`, {
      day: 'monday',
      workouts: workouts,
    });
    console.log('patch', response.data);
  };

  useEffect(() => {
    addExercise(data._id);
    getExercise(data._id);
  }, []);

  return (
    <GradientBG>
      <SafeAreaView />
      <TopBack />
      <SearchBox onSearch={handleSearch} />
      <View>
        <CardList data={listData} navigation={props.navigation} />
      </View>
    </GradientBG>
  );
};

export default ExerciseList;
