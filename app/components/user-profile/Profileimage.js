import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
<<<<<<< HEAD
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
=======
import Raxios from '../../constants/Axios'
import axios from 'axios';
import Constants from 'expo-constants';
import * as SecureStore from 'expo-secure-store';

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new Error('uriToBlob failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })
}
>>>>>>> 2b716b5e9f9282a0967fa7e028252a82cf140bb6

const ProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagetype, setimagetype] = useState('');
  const [imageData,setimagagedata] =useState([])

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
      setimagetype(result.assets[0].uri.split('.')[3]);
<<<<<<< HEAD
      console.log(imagetype);
=======
      console.log(result);
      setimagagedata(result.assets[0]);
>>>>>>> 2b716b5e9f9282a0967fa7e028252a82cf140bb6
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
        console.log(fileType)

<<<<<<< HEAD
        const base = await FileSystem.readAsStringAsync(
          selectedImage.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Base64,
          }
        );

        // const base64Data = base;
        // const binaryData = base64.toByteArray(base64Data);

        // console.log(binaryData);

        console.log(imagetype);
        const formData = new FormData();
        formData.append('profileImage', {
          uri: selectedImage.assets[0].uri,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
          data: base,
        });

        const response = await axios.post(
          `/userProfile/profilePic/${user.userId}/${user.gymId}`,
          { format: imagetype }
        );
=======
        // const formData = new FormData();
        // formData.append('profileImage', {
        //   uri: selectedImage.assets[0].uri,
        //   name: `profile.${fileType}`,
        //   type: `image/${fileType}`,
        //   data: await uriToBlob(selectedImage.assets[0].uri), 
        // });

    
        console.log(imagetype);

        const response = await Raxios.post(`/userProfile/profilePic/${user.userId}/${user.gymId}`, {
          format: `image/${fileType}`,
        });

>>>>>>> 2b716b5e9f9282a0967fa7e028252a82cf140bb6
        const url = response.data.data;
        
        console.log(url);


<<<<<<< HEAD
        const response1 = await axios.put(url, selectedImage.assets[0].uri);
        console.log(response1);

        const response2 = await axios.get(
          `/userProfile/profilePic/${user.userId}/${user.gymId}`
        );
        console.log('3', response.data.data);
        const url2 = response.data.data;

        const response3 = await axios.get(url);
        console.log(response3);
=======
        // Function to upload a file to S3 using a pre-signed URL
        // async function uploadFileToS3(signedUrl, file) {
        //   try {
        //     const response = await fetch(signedUrl, {
        //       method: 'PUT',
        //       body: file,
        //       headers: {
        //         'Content-Type': file.type, // Set the content type to the file's type
        //       },
        //     });
        //     console.log(response.data)
        //     if (response.ok) {
        //       console.log('File uploaded successfully to S3');
        //       // Handle success as needed
        //     } else {
        //       console.error('File upload to S3 failed');
        //       // Handle error as needed
        //     }
        //   } catch (error) {
        //     console.error('Error uploading file to S3:', error);
        //     // Handle error as needed
        //   }
        // }


      //  let x =  await fetch(imageData.uri)
      //    console.log(x);
      //   x.then(response => response.blob())
      //   .then(blob => {
      //     const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });
      //     uploadFileToS3(Url, file);
      //   })
      //   .catch(error => {
      //     console.error('Error fetching image:', error);
      //   });

        const response1 = await axios.put(url,uriToBlob(selectedImage.assets[0].uri));
        console.log(response1);

        // const response2 = await axios.get(`/userProfile/profilePic/${user.userId}/${user.gymId}`);

        // console.log('3', response2.data.data);

        // const url2 = response2.data.data;

        // const response3 = await axios.get(url2);
        // console.log(response3);

>>>>>>> 2b716b5e9f9282a0967fa7e028252a82cf140bb6
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
