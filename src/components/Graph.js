import { View, Text, ScrollView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import GraphLoading from './GraphLoading';
import React, { useState, useEffect } from 'react';
import axios from '../constants/Axios';
import { bgGlass, bgLight, neon } from '../constants/Constants';

const Graph = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString); // Parse the user string to an object
    const gymId = user.gymId;
    console.log('gymId', gymId);
    const response = await axios.get(`/gym/graph/${gymId}`);
    if (response) {
      // console.log(response.data.data);
      const data = response.data.data;
      setChartData(data);
      setIsLoading(false);
    } else {
      console.log('Error fetching data');
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
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
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
        backgroundColor: bgLight,
        padding: 10,
        margin: 6,
      }}>
      {isLoading ? (
        <GraphLoading />
      ) : (
        <ScrollView
          horizontal
          contentContainerStyle={{ width: screenWidth * 2 }}>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                marginBottom: 10,
                marginLeft: 4,
                color: 'white',
              }}>
              Gym Activity - 5 min intervals between updates - 24hrs of data
            </Text>
            <BarChart
              data={data}
              width={2 * screenWidth}
              height={220}
              yAxisInterval={0}
              withHorizontalLabels={true}
              contentInset={{ left: 0, right: 10 }}
              chartConfig={{
                backgroundGradientFrom: '#1E2923',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: neon,
                backgroundGradientToOpacity: 0.1,
                color: (opacity = 1) => `rgba(224, 254, 16, ${opacity})`,
                strokeWidth: 3,
                barPercentage: 0.7,
                useShadowColorFromDataset: false,
              }}
              style={{
                marginLeft: -20,
                borderRadius: 20,
              }}
              verticalLabelRotation={0}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Graph;
