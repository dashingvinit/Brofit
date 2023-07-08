import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ico-material-design';
import { bgColor, neon } from './constants/Constants';

// import MainContainer from './screens/MainContainer';

// const HomeScreen = (navigation) => {
const Home =(props) => {  
  return (
    <View style={{ backgroundColor: 'black' }}>
        <View style={styles.headerContainer}>
          <Image
            source={require('./assets/images/nihal.jpg')}
            style={styles.profilePhoto}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.hiUserText}>Hi User</Text>
          </View>
        </View>

      <ScrollView>

        <View style={styles.boxesContainer}>
          <View style={styles.box}>
            <Text style={styles.boxText}>Box 1</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Box 2</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.boxText}>Box 3</Text>
          </View>
        </View>

        <View style={styles.attendanceContainer}>
          <View style={styles.boxAttendance}>
            <Text>Graph Space</Text>
          </View>
        </View>

        <View>
          <Text style={styles.pageTitle}>Personalized Plan</Text>

          <TouchableOpacity
              onPress={() => props.navigation.navigate('AnimatedVedios')}>
              <Text style={{ color: neon, fontWeight: 'bold', fontSize: 16 }}>
                Signup
              </Text>
            </TouchableOpacity>

        </View>

        <View style={styles.slideableImagesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/shoulder.jpg')}
                style={styles.slideableImage}
              />
            </View>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/back.jpg')}
                style={styles.slideableImage}
              />
            </View>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/chest.jpg')}
                style={styles.slideableImage}
              />
            </View>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/leg.jpg')}
                style={styles.slideableImage}
              />
            </View>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/bicep.jpg')}
                style={styles.slideableImage}
              />
            </View>
            <View style={styles.slideableImage}>
              <Image
                source={require('./assets/images/tricep.jpg')}
                style={styles.slideableImage}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* <MainContainer /> */}

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    paddingTop: 50,
  },
  profilePhoto: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 16,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  hiUserText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  boxesContainer: {
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    height: 130,
    backgroundColor: '#2a2f37',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  attendanceContainer: {
    flexDirection: 'row',
  },
  boxAttendance: {
    flex: 1,
    height: 300,
    backgroundColor: '#2a2f37',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  boxText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#e6fd54',
  },
  pageTitle: {
    color: '#e6fd54',
    margin: 20,
    fontSize: 20,
  },
  slideableImagesContainer: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  slideableImage: {
    width: 380,
    height: 400,
    marginRight: 20,
    borderRadius: 10,
  },
});

export default Home;
