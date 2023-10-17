import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Text,
  Button,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { neon } from '../../constants/Constants';
import { Axios, GetUser } from '../../functoins';

const CreateWorkout = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fittnessLevel, setFittnessLevel] = useState('Beginner');

  const [user, setUser] = useState('');

  useEffect(() => {
    const getRole = async () => {
      const userObj = await GetUser();
      setUser(userObj);
    };
    getRole();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectOption = (option) => {
    setFittnessLevel(option);
    toggleDropdown();
  };

  const handleButtonPress = () => {
    setVisible(!visible);
  };

  const handleSubmit = async () => {
    try {
      const userID = user._id || user.userId;
      await Axios.post(`/routine/${userID}`, {
        title: workoutName,
        level: fittnessLevel.toLowerCase(),
      });
      console.log('workout created');
    } catch (error) {
      console.log('error', error);
    }
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.iconBtn} onPress={handleButtonPress}>
        <Ionicons name="add" size={28} color={neon} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Create Routine</Text>
            <TextInput
              style={styles.input}
              placeholder="Workout Title"
              onChangeText={(text) => setWorkoutName(text)}
            />
            {user.role === 'owner' ? (
              <View>
                <TouchableOpacity
                  style={styles.dropdownButton}
                  onPress={toggleDropdown}>
                  <Text style={styles.level}>
                    {fittnessLevel || 'Beginner'}
                  </Text>
                  <Ionicons
                    name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>

                {isDropdownOpen ? (
                  <View style={styles.optionContainer}>
                    <TouchableOpacity onPress={() => selectOption('Beginner')}>
                      <Text style={styles.levelOptions}>Beginner</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => selectOption('Intermediate')}>
                      <Text style={styles.levelOptions}>Intermediate</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => selectOption('Advanced')}>
                      <Text style={styles.levelOptions}>Advanced</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={[styles.fittnesPlan, { color: 'white' }]}>
                    FITNESS LEVEL
                  </Text>
                )}
              </View>
            ) : null}
            <View style={styles.btnContainer}>
              <Button color="grey" title="Cancel" onPress={handleButtonPress} />
              <Button color="black" title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  iconBtn: {
    paddingHorizontal: 11,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 100,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalCard: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
  },
  dropdownButton: {
    height: 40,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  optionContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '80%',
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 10,
    zIndex: 1,
  },
  level: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelOptions: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
  fittnesPlan: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'gray',
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-around',
  },
});

export default CreateWorkout;
