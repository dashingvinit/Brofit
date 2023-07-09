import { View, Text, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from '../constants/Axios';
import { bgLight, neon } from '../constants/Constants';

const Graph = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    const response = await axios.get('/gym/graph/2');
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

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 20,
        backgroundColor: bgLight,
        padding: 10,
        margin: 6,
      }}>
      <ScrollView horizontal contentContainerStyle={{ width: screenWidth * 2 }}>
        <View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              marginBottom: 10,
              color: neon,
            }}>
            🟢 Gym Activity - 5 min intervals between updates - 24hrs of data
          </Text>
          <BarChart
            data={data}
            width={1.999 * screenWidth}
            height={220}
            yAxisInterval={0}
            withHorizontalLabels={true}
            contentInset={{ left: 0, right: 10 }}
            chartConfig={{
              backgroundGradientFrom: '#1E2923',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: '#08130D',
              backgroundGradientToOpacity: 0.5,
              color: (opacity = 0.5) => `rgba(26, 255, 146, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
              useShadowColorFromDataset: false,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginLeft: -10,
              borderRadius: 20,
            }}
            verticalLabelRotation={30}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Graph;
