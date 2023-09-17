import { View, Text, ScrollView, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BarChart } from 'react-native-chart-kit';
import { GraphLoading } from '../loading-animations';
import React, { useState, useEffect } from 'react';
import axios from '../../constants/Axios';
import { bgGlass, neon } from '../../constants/Constants';

const Graph = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString); // Parse the user string to an object
    const gymId = user.gymId;
    // console.log('gymId', gymId);
    const response = await axios.get(`/gym/graph/${gymId}`);
    if (response) {
      // console.log(response.data.data);
      const data = response.data.data;
      setChartData(data);
      setIsLoading(false);
    } else {
      console.log('Error fetching graph data');
      alert('Error fetching graph data');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 300000);

    return () => {
      clearInterval(interval);
    };
  }, []); // Add an empty dependency array

  const data = {
    labels: [
      '12 am',
      '1 am',
      '2 am',
      '3 am',
      '4 am',
      '5 am',
      '6 am',
      '7 am',
      '8 am',
      '9 am',
      '10 am',
      '11 am',
      '12 pm',
      '1 pm',
      '2 pm',
      '3 pm',
      '4 pm',
      '5 pm',
      '6 pm',
      '7 pm',
      '8 pm',
      '9 pm',
      '10 pm',
      '11 pm',
    ],
    datasets: [
      {
        data: chartData,
      },
    ],
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        backgroundColor: bgGlass,
        padding: 10,
        margin: 6,
      }}>
      {isLoading ? (
        <GraphLoading />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{ width: screenWidth * 2.5 - 20 }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 10,
                marginLeft: 4,
                color: 'white',
              }}>
              Gym Activity
            </Text>
            <BarChart
              data={data}
              width={2.5 * screenWidth}
              height={250}
              yAxisInterval={1}
              contentInset={{ left: 30, right: 10 }}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: neon,
                backgroundGradientToOpacity: 0.1,
                color: (opacity = 1) => `rgba(224, 254, 16, ${opacity})`,
                strokeWidth: 3,
                barPercentage: 1,
                useShadowColorFromDataset: false,
              }}
              style={{
                marginLeft: -20,
                borderRadius: 20,
              }}
              verticalLabelRotation={0}
              showBarTops={true}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Graph;
