import React from 'react';
import Cards from './Cards';

const CardList = ({ data, navigation, screen }) => {
  return (
    <>
      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <Cards
              screen={screen}
              key={index}
              item={item}
              navigation={navigation}
            />
          );
        })}
    </>
  );
};

export default CardList;
