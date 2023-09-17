import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Raxios from '../../constants/Axios';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const ProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagetype, setimagetype] = useState('');
  const [imageData, setimagagedata] = useState([]);
  const [imageUri, setimageUri] = useState('');

  const handleImageSelect = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to your photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result);
      console.log('Result', result);
      setimagetype(result.assets[0].uri.split('.')[3]);
      console.log(imagetype);

      setimageUri(result.assets[0].uri);
      console.log(result.assets[0].uri);

      setimagagedata(result.assets[0]);
      console.log(result.assets[0]);
    }
  };

  const handleUploadImage = async () => {
    if (selectedImage) {
      try {
        const userString = await SecureStore.getItemAsync('user');
        const user = JSON.parse(userString);
        console.log(user);

        const uriParts = selectedImage.assets[0].uri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        console.log(fileType);

        console.log(imagetype);

        const response = await Raxios.post(
          `/userProfile/profilePic/${user.userId}/${user.gymId}`,
          {
            format: `image/${fileType}`,
          }
        );

        const url = response.data.data;

        console.log(url);

        const response1 = await axios.put(
          url,
          uriToBlob(selectedImage.assets[0].uri)
        );
        console.log(response1);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      Alert.alert(
        'Select an Image',
        'Please select an image before uploading.'
      );
    }
  };

  return (
    <View>
      <Image
        source={
          selectedImage
            ? { uri: selectedImage.assets[0].uri }
            : require('../../assets/images/profile.jpg')
        }
        style={{ width: 120, height: 120, borderRadius: 70 }}
      />
      <TouchableOpacity
        style={{ marginLeft: 80, marginTop: -40 }}
        onPress={handleImageSelect}>
        <MaterialCommunityIcons name="pencil" size={25} color={'white'} />
      </TouchableOpacity>
      {selectedImage && (
        <TouchableOpacity
          style={{ marginLeft: 80, marginTop: 10 }}
          onPress={handleUploadImage}>
          <Text>Upload</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileImage;
