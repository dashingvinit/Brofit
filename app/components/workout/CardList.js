import React from 'react';
import Cards from './Cards';

const CardList = ({ data, navigation, screen, getID }) => {
  return (
    <>
      {data?.length > 0 &&
        data.map((item, index) => {
          return (
            <Cards
              getID={getID}
              key={index}
              screen={screen}
              item={item}
              navigation={navigation}
            />
          );
        })}
    </>
  );
};

export default CardList;
