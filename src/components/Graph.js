import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from '../constants/Axios';
import { bgLight } from '../constants/Constants';

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
      '4A',
      '5A',
      '6A',
      '7A',
      '8A',
      '9A',
      '10A',
      '11A',
      '12P',
      '3P',
      '4P',
      '5P',
      '6P',
      '7P',
      '8P',
      '9P',
      '10P',
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
      <BarChart
        data={data}
        width={360}
        height={250}
        yAxisInterval={0}
        // withHorizontalLabels={false}
        contentInset={{ left: 0, right: 10 }}
        chartConfig={{
          backgroundGradientFrom: '#1E2923',
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: '#08130D',
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 0.5) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
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
  );
};

export default Graph;
