import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cards from './Cards';

const CardList = ({ data, navigation, screen, getID, routine }) => {
  return (
    <>
      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <Cards
              getID={getID}
              screen={screen}
              key={index}
              item={item}
              navigation={navigation}
              routine={routine}
            />
          );
        })}
      <View style={styles.separator} />
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
});

export default CardList;
