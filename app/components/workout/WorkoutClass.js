import React, { useState } from 'react';
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
import Axios from '../../functoins/Axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { bgGlass, neon } from '../../constants/Constants';

const WorkoutClass = (props) => {
  const { data, navigation } = props;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const workOutClasses = [
    {
      name: 'Monday',
      workouts: 15,
      image: require('../../assets/images/boxer.jpg'),
    },
    {
      name: 'Tuesday',
      workouts: 20,
      image: require('../../assets/images/calis.jpg'),
    },
    {
      name: 'Wednesday',
      workouts: 15,
      image: require('../../assets/images/yoga.jpg'),
    },
    {
      name: 'Thursday',
      workouts: 10,
      image: require('../../assets/images/home.jpg'),
    },
    {
      name: 'Friday',
      workouts: 15,
      image: require('../../assets/images/bicep.jpg'),
    },
    {
      name: 'Saturday',
      workouts: 20,
      image: require('../../assets/images/cardio.jpg'),
    },
    {
      name: 'Sunday',
      workouts: 15,
      image: require('../../assets/images/CrunchesImage.jpg'),
    },
  ];

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await Axios.delete(`routine/${data._id}`);
      navigation.navigate('Exercise');
      setShowDeleteModal(false); // Hide the delete modal after successful deletion
    } catch (error) {
      console.log(error);
      setShowDeleteModal(false); // Hide the modal in case of an error
    }
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={index}
      onPress={() => {
        navigation.navigate('ExerciseList', { item: item, data: data });
      }}>
      <View style={styles.card}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.day}>{item.name}</Text>
        <Text style={styles.workouts}>{`${item.workouts} workouts`}</Text>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Workout Classes</Text>
        <TouchableOpacity onPress={() => handleDelete()}>
          <MaterialIcons name="delete-outline" size={28} color="white" />
        </TouchableOpacity>
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
              Are you sure you want to delete this item?
            </Text>
            <Button title="Yes, Delete" onPress={confirmDelete} color="red" />
            <Button
              title="Cancel"
              onPress={() => setShowDeleteModal(false)}
              color="gray"
            />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WorkoutClass;
