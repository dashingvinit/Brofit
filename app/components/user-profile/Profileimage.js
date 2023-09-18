import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Raxios from '../../constants/Axios';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ProfileImage = () => {
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  // Getting the pre signed url from backend
  const getPreSignedUrl = async () => {
    const user = await SecureStore.getItemAsync('user');
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.userId;
    const gymId = parsedUser.gymId;

    const SignedUrl = await Raxios.post(
      `/userProfile/profilePic/${userId}/${gymId}`,
      {
        format: 'image/jpeg',
      }
    );
    return SignedUrl.data.data;
  };

  // Getting the blob from the image uri
  const getBlob = async (uri) => {
    const base64String = await FileSystem.readAsStringAsync(uri, {
      encoding: 'base64',
    });
    return base64String;
  };

  // Uploading the image using the pre-signed URL
  const uploadUsingPresignedUrl = async () => {
    const signedUrl = await getPreSignedUrl();
    const imageBody = await getBlob(imageUri);

    fetch(signedUrl, {
      method: 'PUT',
      body: imageBody,
      headers: {
        'Content-Type': 'image/jpeg',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('response', response);
          Alert.alert('Image uploaded successfully');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Fetching the profile pic from backend
  const fetchProfilePic = async () => {
    const user = await SecureStore.getItemAsync('user');
    const parsedUser = JSON.parse(user);
    const userId = parsedUser.userId;
    const gymId = parsedUser.gymId;
    const profilePic = await Raxios.get(
      `/userProfile/profilePic/${userId}/${gymId}`
    );
    setImageUri(profilePic.data.data);
    console.log(imageUri);
  };

  useEffect(() => {
    fetchProfilePic();
  }, []);

  return (
    <View>
      <Image
        source={
          imageUri
            ? { uri: imageUri }
            : require('../../assets/images/profile.jpg')
        }
        style={{ width: 120, height: 120, borderRadius: 70 }}
      />
      <TouchableOpacity
        style={{ marginLeft: 80, marginTop: -40 }}
        onPress={pickImage}>
        <MaterialCommunityIcons name="pencil" size={25} color={'white'} />
      </TouchableOpacity>
      {imageUri && (
        <TouchableOpacity
          style={{ marginLeft: 80, marginTop: 10 }}
          onPress={uploadUsingPresignedUrl}>
          <Text>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImage;
