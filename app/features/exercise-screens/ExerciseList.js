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
import { s } from 'react-native-size-matters';
import { GetUser } from '../../functoins';

const ExerciseList = (props) => {
  const { item, data, routine } = props.route.params;
  const [searchData, setSearchData] = useState([]);
  const [listData, setListData] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [user, setUser] = useState();

  const getExercise = async () => {
    const response = await Axios.get(
      `/routine/content/${data._id}/${item.name.toLowerCase()}`
    );
    const lowercaseItemName = item.name.toLowerCase();
    setListData(response.data.data[lowercaseItemName]);
  };

  const handleSearch = (searchData) => {
    setSearchData(searchData);
  };

  const toggleVisible = () => {
    setVisible(!visible);
  };

  const toggleDeleteVisible = () => {
    setDeleteVisible(!deleteVisible);
    setVisible(!visible);
  };

  const addWorkout = (tag) => {
    const newTags = [...workouts];

    if (newTags.includes(tag)) {
      const index = newTags.indexOf(tag);
      if (index !== -1) {
        newTags.splice(index, 1);
      }
    } else {
      newTags.push(tag);
    }
    setWorkouts(newTags);
  };

  const addExercise = async () => {
    if (workouts.length === 0) {
      setVisible(!visible);
    } else {
      const response = await Axios.patch(`/routine/${data._id}`, {
        day: item.name.toLowerCase(),
        workouts: workouts,
      });
      setWorkouts([]);
      setVisible(!visible);
      getExercise();
    }
  };

  const deleteExercise = async () => {
    if (workouts.length === 0) {
      setVisible(!visible);
    } else {
      setDeleteVisible(true);
      const response = await Axios.patch(`/routine/remove/${data._id}`, {
        day: item.name.toLowerCase(),
        workouts: workouts,
      });
      setWorkouts([]);
      setVisible(!visible);
      getExercise();
      setDeleteVisible(false);
    }
  };

  useEffect(() => {
    getExercise();
    const getUser = async () => {
      const fetchedUser = await GetUser();
      setUser(fetchedUser.role);
    };
    getUser();
  }, []);

  return (
    <GradientBG>
      <SafeAreaView />
      <TopBack>{data.title}</TopBack>
      <View style={styles.topContainer}>
        <View>
          <Text style={styles.heading}>{item.name}</Text>
          <Text style={styles.subHeading}>{listData?.length} EXERCISE</Text>
        </View>
        {user === routine ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            {listData?.length > 0 && (deleteVisible || !visible) ? (
              <TouchableOpacity onPress={toggleDeleteVisible}>
                <Ionicons
                  name={visible ? 'ios-close-circle' : 'ios-trash-bin'}
                  size={35}
                  color="#fff"
                />
              </TouchableOpacity>
            ) : null}
            {deleteVisible ? null : (
              <TouchableOpacity onPress={toggleVisible}>
                <Ionicons
                  name={visible ? 'ios-close-circle' : 'ios-add-circle'}
                  size={40}
                  color="#fff"
                />
              </TouchableOpacity>
            )}
          </View>
        ) : null}
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.scrollContainer}>
          {visible ? (
            <>
              {deleteVisible ? null : <SearchBox onSearch={handleSearch} />}
              <CardList
                getID={addWorkout}
                data={deleteVisible ? listData : searchData}
                navigation={props.navigation}
              />
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  alignSelf: 'flex-end',
                  marginRight: 10,
                }}>
                {workouts.length} Selected
              </Text>
              <TouchableOpacity
                style={{
                  marginVertical: 10,
                  alignItems: 'center',
                  backgroundColor: '#000',
                  paddingVertical: 7,
                  borderRadius: 10,
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 5,
                }}
                onPress={deleteVisible ? deleteExercise : addExercise}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                  }}>
                  {deleteVisible ? 'Delete' : 'Add'}
                </Text>
                <Ionicons
                  name={
                    deleteVisible ? 'ios-trash-bin' : 'ios-checkmark-circle'
                  }
                  size={25}
                  color="#fff"
                />
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
