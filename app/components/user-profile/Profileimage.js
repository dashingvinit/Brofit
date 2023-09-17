import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Alert, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Raxios from '../../constants/Axios';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// const uriToBlob = (uri) => {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest()
//     xhr.onload = function () {
//       // return the blob
//       resolve(xhr.response)
//     }
//     xhr.onerror = function () {
//       reject(new Error('uriToBlob failed'))
//     }
//     xhr.responseType = 'blob'
//     xhr.open('GET', uri, true)
//     xhr.send(null)
//   })
// }

const ProfileImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagetype, setimagetype] = useState('');
  const [imageData, setimagagedata] = useState([]);

  const handleImageSelect = async () => {
    // permission le rha user se media ki
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please allow access to your photos.');
      return;
    }

    // media se pic utha rha hai

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // image jo humne select ki hai usko store ker rha result me

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

        // uri part me locaton hai starting file me
        const uriParts = selectedImage.assets[0].uri.split('.');

        // fileType me  image format store ho rha
        const fileType = uriParts[uriParts.length - 1];
        console.log(fileType);

        // binary me conversion kr rhe

        const fileData = await FileSystem.readAsStringAsync(
          selectedImage.assets[0].uri,
          {
            encoding: FileSystem.EncodingType.Binary,
          }
        );

        // console.log(fileData)

        // formadata me image store ho rhka hai

        const formData = new FormData();
        formData.append('profileImage', {
          uri: selectedImage.assets[0].uri,
          name: `profile.${fileType}`,
          type: `image/${fileType}`,
        });

        // formdata display ho rha
        console.log(formData._parts);

        // const res = await fetch(selectedImage.assets[0].uri)
        // console.log(res);

        console.log(imagetype);

        // async function uploadFileToS3(uri) {
        //   try {
        //     // Create a new FormData object
        //     const formData = new FormData();

        //     // Determine the file type based on the file extension
        //     const fileType = uri.endsWith('.jpeg') ? 'image/jpeg' : 'video/mp4';

        //     // Append the file to the FormData
        //     formData.append('file', {
        //       uri: Platform.OS === 'android' ? `file://${uri}` : uri,
        //       type: fileType,
        //       name: 'yourFileName.jpg', // Set the desired file name
        //     });

        //     // Make an HTTP request to the S3 pre-signed URL
        //     const response = await fetch('YOUR_S3_SIGNED_URL', {
        //       method: 'PUT',
        //       body: formData,
        //       headers: {
        //         'Content-Type': 'multipart/form-data',
        //       },
        //     });

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

        // file type bhej rhe hum api ko jisse link milegi s3 ki
        const response = await Raxios.post(
          `/userProfile/profilePic/${user.userId}/${user.gymId}`,
          {
            format: `image/${fileType}`,
          }
        );

        const url = response.data.data;
        console.log(url);

        // file url me img ka data bhej rhe
        const response1 = await axios.put(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(formData);
        console.log(response1);

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

        // await fetch(selectedImage)
        //   then(response => response.blob())
        //   .then(blob => {
        //     const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' });
        //     uploadFileToS3(Url, file);
        //   })
        //   .catch(error => {
        //     console.error('Error fetching image:', error);
        //   });

        //   const response1 = await axios.put(url,uriToBlob(selectedImage.assets[0].uri));
        //   console.log(response1);

        //  grt request api ki hai jisse linkmelegi uploaded img ki
        const response2 = await Raxios.get(
          `/userProfile/profilePic/${user.userId}/${user.gymId}`
        );
        console.log('3', response2.data.data);

        // img ki link se get ker rhe img
        const url2 = response2.data.data;
        const response3 = await axios.get(url2);
        console.log(response3);
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
