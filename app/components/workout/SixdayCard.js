import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import React from 'react';
import { SixdayWorkOut } from '../../assets/images';

const SixdayCard = (props) => {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('SixDayWorkoutPlan');
      }}>
      <View style={styles.card}>
        <ImageBackground
          source={SixdayWorkOut}
          style={styles.imageBackground}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 250,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default SixdayCard;
