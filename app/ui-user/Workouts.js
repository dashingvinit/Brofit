import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { GradientBG, SearchBox, CardList, RoutineList } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const Workouts = (props) => {
  const [data, setData] = useState([]);

  const handleSearch = (searchData) => {
    setData(searchData);
  };

  return (
    <GradientBG>
      <SafeAreaView />
      <View style={styles.container}>
        <SearchBox onSearch={handleSearch} />
        <View style={styles.separator} />

        <ScrollView style={styles.scroll}>
          <View style={styles.scrollContainer}>
            {data.length > 0 ? (
              <CardList data={data} navigation={props.navigation} />
            ) : null}
            <RoutineList navigation={props.navigation} />
          </View>
        </ScrollView>
      </View>
    </GradientBG>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    //marginHorizontal: 10,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    marginHorizontal: 7,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 100,
  },
});

export default Workouts;
