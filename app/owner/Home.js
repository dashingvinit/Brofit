import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Graph, Top, CheckedIn, OwnerStatus, GradientBG } from '../components';
import { bgGlass, neon } from '../constants/Constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Home = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  return (
    <GradientBG>
      <View style={{ flex: 1 }}>
        <Top
          navigation={props.navigation}
          setHandleLogout={props.setHandleLogout}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['blue']}
            />
          }>
          <View style={styles.boxesContainer}>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ActiveList')}>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons
                    name="flame-sharp"
                    style={{
                      color: neon,
                    }}
                    size={45}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Active
                  </Text>
                  <Text
                    style={{ color: 'white', fontWeight: '100', fontSize: 14 }}>
                    Members
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('InactiveList')}>
                <View style={{ alignItems: 'center' }}>
                  <Ionicons
                    name="cog-outline"
                    style={{
                      color: neon,
                    }}
                    size={45}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    Inactive
                  </Text>
                  <Text style={{ color: 'white', fontSize: 14 }}>Members</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.box}>
              <View style={{ alignItems: 'center' }}>
                <FontAwesome5
                  name="dumbbell"
                  style={{
                    color: neon,
                  }}
                  size={45}
                />
                <OwnerStatus />
              </View>
            </View>
          </View>
          <Graph />
          <View style={{ marginBottom: 100 }}>
            <CheckedIn navigation={props.navigation} />
          </View>
        </ScrollView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  boxesContainer: {
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    height: 120,
    backgroundColor: bgGlass,
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  boxText: {
    color: neon,
  },
});

export default Home;
