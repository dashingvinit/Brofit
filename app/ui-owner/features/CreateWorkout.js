import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import {
  pickImage,
  uploadUsingPresignedUrl,
  fetchProfilePic,
} from '../../functoins/ImgUpload';

const CreateWorkout = () => {
  const [imageUri, setImageUri] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    fetchProfilePic().then((res) => {
      setProfilePic(res);
    });
  }, []);

  const handleImageUpload = async () => {
    await pickImage().then((res) => {
      setImageUri(res);
    });
  };

  const handleUpload = async () => {
    await uploadUsingPresignedUrl(imageUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WORKOUT</Text>

      <View style={styles.workoutCard}>
        <Image
          source={require('../../assets/images/placeHolder.jpg')}
          style={styles.img}
        />
        <Text style={styles.workOutName}>Bicep curls</Text>
      </View>
      <View style={styles.workoutCard}>
        <Image
          source={require('../../assets/images/placeHolder.jpg')}
          style={styles.img}
        />
        <Text style={styles.workOutName}>Bicep curls</Text>
      </View>
      <View style={styles.workoutCard}>
        <Image
          source={require('../../assets/images/placeHolder.jpg')}
          style={styles.img}
        />
        <Text style={styles.workOutName}>Bicep curls</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  heading: {
    marginTop: 20,
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
  },
  workoutCard: {
    marginTop: 2,
    padding: 7,
    backgroundColor: 'white',
    height: 130,
    borderRadius: 30,

    flexDirection: 'row',
    gap: 10,
  },
  img: {
    height: '100%',
    width: '33%',
    borderRadius: 30,
  },
  workOutName: {
    marginTop: 10,
    fontSize: 24,
    color: 'black',
  },
});

export default CreateWorkout;
