import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { COLORS } from "./constants";

function FetchQuote() {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [imgSrc, setImgSrc] = useState("");

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
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        setQuote(data[0].text);
        setAuthor(data[0].author);
      });
  }

  return (
    <View style={{padding:20}}>
      <Text style={{backgroundColor: COLORS.gray3, borderRadius:30,paddingHorizontal: 25, paddingVertical:25, color:COLORS.lightWhite}}>{quote}</Text>
            
    </View>
  );
}

export default FetchQuote;
