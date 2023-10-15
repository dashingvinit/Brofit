import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import axios from '../constants/Axios';
import React, { useEffect, useState } from 'react';
import { bgColor, bgLight, neon, bgGlass } from '../constants/Constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBack, GradientBG, Hr } from '../components';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'react-native-svg';
import * as FileSystem from 'expo-file-system';

const UserProfile = (props) => {
  const user = props.route.params.user._id;
  const [userData, setUserData] = useState(null);
  const [planExiper, setPlanExiper] = useState(null);
  const [id, setid] = useState('');
  const [showform, setshowform] = useState(false);
  const [loading, setloading] = useState(true);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle the modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to show the modal
  const showModal = () => {
    setShowImage(!showImage);
  };

  const fetchUserProfileData = async () => {
    try {
      const response = await axios.get(`/userProfile/${user}`);
      const data = response.data.data;
      setUserData(data);
      await fetchProfilePic(data.gymId);
    } catch (error) {
      setYs;
    }
    setloading(false);
  };

  const getDifferenceInDays = async (dateString) => {
    if (!dateString) return null;
    const [day, month, year] = dateString.split('-').map(Number);
    const givenDate = new Date(year, month - 1, day);
    if (isNaN(givenDate.getTime())) return null;
    const currentDate = new Date();
    const timeDifferenceInMilliseconds = givenDate - currentDate;
    const differenceInDays = Math.floor(
      timeDifferenceInMilliseconds / (1000 * 60 * 60 * 24)
    );
    setPlanExiper(differenceInDays);
    return differenceInDays;
  };

  useEffect(() => {
    const fetchAndCalculatePlanExpiry = async () => {
      fetchUserProfileData();
      const givenDateString = userData?.planExpiryDate;

      if (userData && givenDateString) {
        const differenceInDays = await getDifferenceInDays(givenDateString);
        setPlanExiper(differenceInDays);
      }
    };
    fetchAndCalculatePlanExpiry();
  }, [userData?.planExpiryDate]);

  const handleStatus = () => {
    const updatedStatus = 'active';
    axios
      .patch(`/userProfile/plan/${user}`, { status: updatedStatus })
      .then((response) => {
        const responseData = response.data;
        setUserData(responseData.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleclick = () => {
    setid(userData.userId.registerationNumber);
    setshowform(true);
  };

  const handleSave = () => {
    axios
      .patch(`user/reg/${user}`, { registerationNumber: id })
      .then((response) => {
        fetchUserProfileData();
      })
      .catch((error) => {
        console.error(error);
      });
    setshowform(false);
    setloading(true);
  };

  // Fetching the profile pic from backend
  const fetchProfilePic = async (gymId) => {
    const localUri = `${FileSystem.cacheDirectory}profilePicture/${user}.jpg`;
    const localInfo = await FileSystem.getInfoAsync(localUri);
    if (localInfo.exists) {
      setImage(localUri);
      return;
    } else {
      try {
        const profilePic = await axios.get(
          `/userProfile/profilePic/${user}/${gymId}`
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
        const localImageUri = `${FileSystem.cacheDirectory}profilePicture/${user}.jpg`;
        await FileSystem.writeAsStringAsync(localImageUri, binaryString, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Set the image URI for display
        setImage(localImageUri);
      } catch (err) {
        console.log('error fetching profile pic', err);
      }
    }
  };

  async function getBase64StringFromHttpsSource(imageUrl) {
    const response = await fetch(imageUrl);
    const text = await response.text();
    return text;
  }

  return (
    <GradientBG style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>User Profile</TopBack>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.profileCard}>
            <View style={{ marginBottom: 0, marginTop: 10, marginLeft: '90%' }}>
              <TouchableOpacity onPress={handleclick}>
                <MaterialCommunityIcons
                  name="pencil"
                  size={30}
                  color={bgColor}
                />
              </TouchableOpacity>
            </View>
            {showform ? (
              <View
                style={{ width: '70%', marginBottom: 20, marginLeft: '10%' }}>
                <TextInput
                  style={styles.input}
                  placeholder="Reg. Id"
                  placeholderTextColor={'black'}
                  value={id.toString()}
                  onChangeText={setid}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                  }}>
                  <TouchableOpacity
                    onPress={() => setshowform(false)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSave} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )}
            <View style={styles.profileContainer}>
              <TouchableOpacity style={{}} onPress={showModal}>
                <Image
                  source={
                    image
                      ? { uri: image }
                      : require('../assets/images/profile.jpg')
                  }
                  style={{ width: 120, height: 120, borderRadius: 70 }}
                />
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={showImage}
                onRequestClose={showModal}>
                <View style={styles.expandedImgContainer}>
                  <TouchableOpacity onPress={showModal} style={styles.backBtn}>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
                  </TouchableOpacity>
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.linearGradient}></LinearGradient>
                  <Image
                    source={
                      image
                        ? { uri: image }
                        : require('../assets/images/profile.jpg')
                    }
                    style={styles.expandedImg}
                  />
                </View>
              </Modal>
              <Text style={styles.userName}>{userData?.userId?.name}</Text>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 16,
                  color: bgLight,
                }}>
                {userData?.userId.email}
              </Text>
            </View>
            <View style={styles.profileIcons}>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: bgColor,
                  width: '30%',
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 30,
                }}>
                {userData?.status == 'active' ? (
                  <MaterialCommunityIcons
                    name="card-bulleted-outline"
                    size={30}
                    color={bgColor}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="card-bulleted-off-outline"
                    size={30}
                    color={bgGlass}
                  />
                )}
                <Text>{userData?.status}</Text>
                <Text>Plan</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: bgColor,
                  width: '30%',
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 30,
                }}>
                <MaterialCommunityIcons
                  name="clipboard-outline"
                  size={30}
                  color={bgColor}
                />
                <Text>Reg.Id</Text>
                <Text>{userData?.userId.registerationNumber}</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  borderColor: bgColor,
                  width: '30%',
                  borderWidth: 2,
                  padding: 10,
                  borderRadius: 30,
                }}>
                <MaterialCommunityIcons
                  name="calendar-clock-outline"
                  size={30}
                  color={bgColor}
                />
                <Text>Exp.In</Text>
                <Text>{planExiper}d</Text>
              </View>
            </View>
          </View>
          <Hr />

          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
              }}>
              <View style={styles.smContainer}>
                <Text>Height </Text>
                <Text style={styles.smHeader}>{userData?.height}</Text>
                <Text style={{ fontSize: 12 }}>cms</Text>
              </View>
              <View style={styles.smContainer}>
                <Text>Weight</Text>
                <Text style={styles.smHeader}>{userData?.weight}</Text>
                <Text style={{ fontSize: 12 }}>KG</Text>
              </View>
              <View style={styles.smContainer}>
                <Text>Age</Text>
                <Text style={styles.smHeader}>{userData?.age}</Text>
                <Text style={{ fontSize: 12 }}>Yrs</Text>
              </View>
            </View>

            {userData?.status == 'inactive' ? (
              <View style={styles.editContainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.editHeader}>Activate the plan</Text>
                  <TouchableOpacity
                    onPress={handleStatus}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Activate</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </>
          <Hr />
          <View style={styles.bottomContainer1}>
            <Text style={styles.smHeader}>Plan details:</Text>
            <Text style={styles.text}>
              Plan Expires: {userData?.planExpiryDate}
            </Text>
            <Text style={styles.text}>
              Plan: {userData?.plan ? userData.plan.name : 'Plans not found'}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.text}>Status: {userData?.status}</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.smHeader}>Profile Details:</Text>
            <Text style={styles.text}>Address: {userData?.address}</Text>
            <Text style={styles.text}>
              Contact:{' '}
              {userData?.phoneNumber ? userData.phoneNumber : 'Not submitted'}
            </Text>
          </View>
          {loading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 300,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0, 0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('../assets/lottieFiles/loadingSkeliton.json')}
                autoPlay
                loop
              />
            </View>
          )}
          {/* <View style={{ bottom: 80 }}>
            <CreateChart UserID={userID} />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: neon,
    borderRadius: 30,
    borderColor: bgColor,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  expandedImgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    //backgroundColor: bgGlass,
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
  profileContainer: {
    paddingBottom: 30,
    paddingTop: 0,
    paddingHorizontal: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    color: bgColor,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  profileIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: bgColor,
    paddingHorizontal: 30,
    paddingVertical: 5,
    marginRight: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: neon,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: '#ffffff66',
    borderRadius: 30,
    marginTop: 10,
  },
  input: {
    color: 'black',
    backgroundColor: '#FAF3F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  smContainer: {
    backgroundColor: '#F8FFDB',
    height: 180,
    minWidth: '33%',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 30,
    marginTop: 10,
    padding: 20,
    borderColor: bgColor,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  smHeader: {
    fontSize: 38,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  bottomContainer: {
    padding: 20,
    backgroundColor: '#1B6B93',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    borderColor: bgColor,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    marginBottom: 100,
  },
  bottomContainer1: {
    padding: 20,
    backgroundColor: '#4FC0D0',
    borderRadius: 30,
    marginTop: 10,
    borderColor: '#164B60',
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  text: {
    color: 'black',
    marginVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  editContainer: {
    backgroundColor: '#ffffff66',
    borderRadius: 30,
    marginTop: 10,
    paddingRight: 10,
    borderColor: bgColor,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  editHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    color: bgColor,
  },
  button: {
    backgroundColor: bgColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: neon,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserProfile;
