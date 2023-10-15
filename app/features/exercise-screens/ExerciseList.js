import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { GradientBG, TopBack, CardList, SearchBox } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from '../../functoins/Axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ExerciseList = (props) => {
  const { item, data } = props.route.params;
  const [searchData, setSearchData] = useState([]);
  const [listData, setListData] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [visible, setVisible] = useState(false);

  const getExercise = async () => {
    const response = await Axios.get(
      `/routine/content/${data._id}/${item.name.toLowerCase()}/`
    );
    setListData(response.data.data.monday);
  };

  const handleSearch = (searchData) => {
    setSearchData(searchData);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const addWorkout = (item) => {
    setWorkouts((workouts) => [...workouts, item]);
  };

  const addExercise = async () => {
    const response = await Axios.patch(`/routine/${data._id}`, {
      day: item.name.toLowerCase(),
      workouts: workouts,
    });
    console.log('patch', response.data);
    setWorkouts([]);
    setVisible(!visible);
    getExercise();
  };

  useEffect(() => {
    getExercise();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView />
      <TopBack>{data.title}</TopBack>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.heading}>{item.name}</Text>
          <Text style={styles.subHeading}>{listData?.length} WORKOUTS</Text>
        </View>
        <TouchableOpacity onPress={toggleVisible}>
          <Ionicons
            name={visible ? 'ios-close-circle' : 'ios-add-circle'}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContainer}>
          {visible ? (
            <>
              <SearchBox onSearch={handleSearch} />
              <CardList
                getID={addWorkout}
                data={searchData}
                navigation={props.navigation}
              />
              <View style={styles.separator} />
              <TouchableOpacity
                style={{ alignItems: 'center', marginVertical: 10 }}
                onPress={addExercise}>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  Add {workouts.length} Workouts
                </Text>
                <Ionicons name="ios-checkmark-circle" size={40} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <CardList data={listData} navigation={props.navigation} />
          )}
        </View>
      </ScrollView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
    marginHorizontal: 7,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginHorizontal: 10,
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeading: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    paddingBottom: 100,
  },
});

export default ExerciseList;
