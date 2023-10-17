import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import { Axios, GetUser } from '../../functoins';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { bgGlass, bgGlassLight, neon } from '../../constants/Constants';

const WorkoutClass = (props) => {
  const { data, navigation, routine } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [user, setUser] = useState();

  const workOutClasses = [
    {
      name: 'Monday',
      workouts: data.monday,
      image: require('../../assets/images/boobs.jpg'),
    },
    {
      name: 'Tuesday',
      workouts: data.tuesday,
      image: require('../../assets/images/calis.jpg'),
    },
    {
      name: 'Wednesday',
      workouts: data.wednesday,
      image: require('../../assets/images/boxer.jpg'),
    },
    {
      name: 'Thursday',
      workouts: data.thursday,
      image: require('../../assets/images/bicep.jpg'),
    },
    {
      name: 'Friday',
      workouts: data.friday,
      image: require('../../assets/images/bell.jpg'),
    },
    {
      name: 'Saturday',
      workouts: data.saturday,
      image: require('../../assets/images/cardio.jpg'),
    },
    {
      name: 'Sunday',
      workouts: data.sunday,
      image: require('../../assets/images/CrunchesImage.jpg'),
    },
  ];

  useEffect(() => {
    const getRole = async () => {
      const userObj = await GetUser();
      setUser(userObj.role);
    };
    getRole();
  }, []);

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await Axios.delete(`routine/${data._id}`);
      navigation.navigate('Exercise');
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
      setShowDeleteModal(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.navigate('ExerciseList', { item, data, routine });
      }}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.day}>{item.name}</Text>
        <Text style={styles.workouts}>
          {item.workouts == 1 ? 'Rest Day' : `${item.workouts} workouts`}
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={25}
          color="black"
          backgroundColor={neon}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.deleteContainer}>
        <Text style={styles.title}>Workout Days</Text>

        {routine === user && (
          <TouchableOpacity onPress={() => handleDelete()}>
            <Ionicons name="ios-trash-bin" size={28} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={workOutClasses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this routine?
            </Text>
            <View style={styles.btnContainer}>
              <Button title="Yes, Delete" onPress={confirmDelete} color="red" />
              <Button
                title="Cancel"
                onPress={() => setShowDeleteModal(false)}
                color="gray"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: bgGlass,
    borderRadius: 20,
    margin: 10,
    width: 200,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  day: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  workouts: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  icon: {
    marginTop: 10,
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 50,
  },
  deleteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: bgGlassLight,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WorkoutClass;
