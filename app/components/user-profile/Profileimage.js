import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
} from 'react-native';
//import { Image as ImageCompressor } from 'react-native-compressor';
import { Video, ResizeMode } from 'expo-av';
import { bgGlass } from '../../constants/Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import Raxios from '../../constants/Axios';

const ProfileImage = () => {
  const [imageUri, setImageUri] = useState(null);
  const [headers, setHeaders] = useState({});
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to show the modal
  const showModal = () => {
    setShowImage(!showImage);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      // const compressedImage = await ImageCompressor.compress(imageUri, {
      //   quality: 0.5,
      //   compressFormat: 'jpeg',
      //   maxWidth: 500,
      //   maxHeight: 500,
      //   autoRotate: true,
      // });
      // setImageUri(compressedImage.path);
    }
  };

  // Getting the pre signed url from backend
  const getPreSignedUrl = async () => {
    try {
      const user = await SecureStore.getItemAsync('user');
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id || parsedUser.userId;
      const gymId = parsedUser.gymId;
      const imageFormat = imageUri.split('.').pop();
      const format = `image/${imageFormat}`;
      const SignedUrl = await Raxios.post(
        `/userProfile/profilePic/${userId}/${gymId}`,
        {
          format: format,
        }
      );
      setHeaders(SignedUrl.headers);
      return SignedUrl.data.data;
    } catch (err) {
      console.error('Error getting signed URL', err);
      return null;
    }
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
    setIsLoading(true);
    const signedUrl = await getPreSignedUrl();
    const imageBody = await getBlob(imageUri);

    fetch(signedUrl, {
      method: 'PUT',
      body: imageBody,
      headers: {
        ...headers,
      },
    })
      .then((response) => {
        {
          if (response.ok) {
            alert('Profile Updated');
            setImageUri('');
            fetchProfilePic();
            setIsLoading(false);
          }
        }
      })
      .catch((err) => {
        setIsLoading(false);
        alert('Error Uploading Image');
        console.error(err);
      });
  };

  // Fetching the profile pic from backend
  const fetchProfilePic = async () => {
    try {
      const user = await SecureStore.getItemAsync('user');
      const parsedUser = JSON.parse(user);
      const userId = parsedUser._id || parsedUser.userId;
      const gymId = parsedUser.gymId;

      const localUri = `${FileSystem.cacheDirectory}profilePicture/${userId}.jpg`;
      const localInfo = await FileSystem.getInfoAsync(localUri);
      if (localInfo.exists) {
        setImage(localUri);
        return;
      } else {
        const profilePic = await Raxios.get(
          `/userProfile/profilePic/${userId}/${gymId}`
        );
        const imageUrl = profilePic.data.data;
        const binaryString = await getBase64StringFromHttpsSource(imageUrl);

        // Save the image to cache
        await FileSystem.makeDirectoryAsync(
          `${FileSystem.cacheDirectory}profilePicture/`,
          {
            intermediates: true,
          }
        );
        const localImageUri = `${FileSystem.cacheDirectory}profilePicture/${userId}.jpg`;
        await FileSystem.writeAsStringAsync(localImageUri, binaryString, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Set the image URI for display
        setImage(localImageUri);
      }
    } catch (err) {
      setImage(null);
      console.log(err);
    }
  };

  async function getBase64StringFromHttpsSource(imageUrl) {
    const response = await fetch(imageUrl);
    const text = await response.text();
    return text;
  }

  useEffect(() => {
    fetchProfilePic();
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={{ position: 'relative' }}>
        {/* <View style={styles.container}>
          <Video
            ref={video}
            style={{ width: 120, height: 120, borderRadius: 70 }}
            source={{
              uri: imageUri || image,
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
          <View style={styles.buttons}>
            <Button
              title={status.isPlaying ? 'Pause' : 'Play'}
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            />
          </View>
        </View> */}
        <Image
          source={
            imageUri || image
              ? { uri: imageUri || image }
              : require('../../assets/images/profile.jpg')
          }
          style={{ width: 120, height: 120, borderRadius: 70 }}
        />
      </TouchableOpacity>
      {isModalVisible ? (
        <View style={styles.imageActions}>
          <TouchableOpacity style={{}} onPress={pickImage}>
            <FontAwesome name="edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={showModal}>
            <MaterialIcons name="zoom-out-map" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showImage}
        onRequestClose={showModal}>
        <View style={styles.expandedImgContainer}>
          <TouchableOpacity onPress={showModal} style={styles.backBtn}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={
              imageUri || image
                ? { uri: imageUri || image }
                : require('../../assets/images/profile.jpg')
            }
            style={styles.expandedImg}
          />
        </View>
      </Modal>

      {imageUri && (
        <TouchableOpacity
          style={styles.editButton}
          onPress={uploadUsingPresignedUrl}>
          {isLoading ? (
            <LottieView
              source={require('../../assets/lottieFiles/loadingcircles.json')}
              autoPlay
              loop
              style={{ height: 20, width: 25 }}
            />
          ) : (
            <Text style={styles.uploadTxt}>Upload</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageActions: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 10,
    backgroundColor: bgGlass,
    padding: 5,
    marginTop: 5,
    borderRadius: 10,
    position: 'absolute',
    right: -40,
    top: 20,
  },
  editButton: {
    alignSelf: 'center',
    marginTop: 10,
    width: '100%',
    minHeight: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  expandedImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: bgGlass,
  },
  backBtn: {
    margin: 20,
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  expandedImg: {
    width: '90%',
    height: '60%',
    borderRadius: 20,
  },
  uploadTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProfileImage;
