import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GradientBG, SearchBox, CardList, RoutineList } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';

const Exercise = (props) => {
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
            <CardList data={data} navigation={props.navigation} />
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
    marginHorizontal: 10,
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

export default Exercise;
