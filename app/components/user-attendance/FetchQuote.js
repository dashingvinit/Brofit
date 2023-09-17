import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { bgColor, bgGlass, bgLight, neon } from '../../constants/Constants';

function FetchQuote() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    getQuote();
    const intervalID = setInterval(() => {
      getQuote();
    }, 24 * 60 * 60 * 1000);
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  function getQuote() {
    fetch('https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomQuote = data[randomIndex];
        setQuote(randomQuote.text);
        setAuthor(randomQuote.author);
      });
  }

  return (
    <View
      style={{
        marginBottom: 20,
        marginTop: 40,
        backgroundColor: bgGlass,
        paddingTop: 20,
        borderRadius: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 'bold',
          color: neon,
        }}>
        Quote of the Day
      </Text>
      <View style={{ margin: 10 }}>
        <Text
          style={{
            backgroundColor: neon,
            borderRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 20,
            width: '100%',
            color: bgColor,
          }}>
          {quote}
        </Text>
      </View>
    </View>
  );
}

export default FetchQuote;
