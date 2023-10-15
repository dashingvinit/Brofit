import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import EBtn from './ExitButton';
import { neon, offWhite } from '../../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Axios, GetUser } from '../../functoins/';
import * as FileSystem from 'expo-file-system';

const Top = (props) => {
  const [image, setimage] = useState(null);
  const [user, setuser] = useState({});

  async function GetB64StrFromHttpsSrc(imageUrl) {
    const response = await fetch(imageUrl);
    const text = await response.text();
    return text;
  }

  const fetchProfilePic = async () => {
    try {
      const USER = await GetUser();
      setuser(USER);
      const userId = USER.userId || USER._id;
      const gymId = USER.gymId;

      const localUri = `${FileSystem.cacheDirectory}profilePicture/${userId}.jpg`;
      const localInfo = await FileSystem.getInfoAsync(localUri);
      if (localInfo.exists) {
        setimage(localUri);
        return;
      } else {
        const profilePic = await Axios.get(
          `/userProfile/profilePic/${userId}/${gymId}`
        );
        const imageUrl = profilePic.data.data;
        const binaryString = await GetB64StrFromHttpsSrc(imageUrl);
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
        setimage(localImageUri);
      }
    } catch (err) {
      setimage(null);
    }
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      props.setHandleLogout();
      props.navigation.navigate('Welcome');
    } catch (error) {
      console.error('error', error);
    }
  };

  const notify = () => {
    props.navigation.navigate('Notification');
  };

  const notifyowner = () => {
    props.navigation.navigate('Notification');
  };

  useEffect(() => {
    fetchProfilePic();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {user.role === 'Admin' ? (
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/profile.jpg')}
              style={styles.img}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfilePage')}>
            <Image
              source={
                image
                  ? { uri: image }
                  : require('../../assets/images/profile.jpg')
              }
              style={styles.img}
            />
          </TouchableOpacity>
        )}

        <View>
          <Text style={styles.hellomsg}>Welcome Back</Text>
          <Text style={styles.name}>{user.name}</Text>
        </View>
      </View>
      <View style={styles.row}>
        {user.role === 'owner' ? (
          <EBtn
            btnLabel={<Ionicons name="notifications" color={neon} size={30} />}
            Press={notifyowner}
          />
        ) : (
          <EBtn
            btnLabel={<Ionicons name="notifications" color={neon} size={30} />}
            Press={notify}
          />
        )}
        <EBtn
          btnLabel={<Ionicons name="ios-exit-outline" color={neon} size={30} />}
          Press={handleLogout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    paddingTop: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 10,
  },
  hellomsg: {
    fontSize: 12,
    fontWeight: 'bold',
    color: offWhite,
  },
  name: { fontSize: 24, fontWeight: 'bold', color: 'white' },
});

export default Top;
