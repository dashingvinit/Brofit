import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { bgGlassLight } from '../../constants/Constants';
import { ProgressChart } from 'react-native-chart-kit';
import axios from '../../constants/Axios';
import * as SecureStore from 'expo-secure-store';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CircleGraph = () => {
  const screenWidth = Dimensions.get('window').width;

  const [Gdata, setGData] = useState([0, 0, 0]);
  const [month, setMonth] = useState('09');
  const [attended, setAttended] = useState();
  const [days, setDays] = useState();
  const [total, setTotal] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectCategory = (index, num) => {
    setSelectedCategory(index); // Update the selected category
    setMonth(num);
  };

  const getData = async () => {
    const userString = await SecureStore.getItemAsync('user');
    const user = JSON.parse(userString);
    const userID = user?.userId || user?._id;

    axios.get(`/attendance/monthlyCount/${userID}/${month}`).then((res) => {
      const present = JSON.stringify(res.data.data.attended);
      setAttended(present);
      const total = JSON.stringify(res.data.data.total);
      setDays(total);
      const attended = present / total;
      const presentHours = res.data.data.totalMinutes;
      setTotal((presentHours / 60).toFixed(2));
      const hours = presentHours / 540;
      const active = 0.4;
      const data = [active, hours, attended];
      setGData(data);
    });
  };

  useEffect(() => {
    getData();
  }, [month]);

  const categories = [
    {
      month: 'Jan',
      num: '01',
    },
    {
      month: 'Feb',
      num: '02',
    },
    {
      month: 'Mar',
      num: '03',
    },
    {
      month: 'Apr',
      num: '04',
    },
    {
      month: 'May',
      num: '05',
    },
    {
      month: 'Jun',
      num: '06',
    },
    {
      month: 'Jul',
      num: '07',
    },
    {
      month: 'Aug',
      num: '08',
    },
    {
      month: 'Sep',
      num: '09',
    },
    {
      month: 'Oct',
      num: '10',
    },
    {
      month: 'Nov',
      num: '11',
    },
    {
      month: 'Dec',
      num: '12',
    },
  ];

  const data = {
    labels: ['Active', 'Hours', 'Attended'],
    data: Gdata,
    color: ['#d57a61', '#f5b971', '#f5b971'],
  };

  const chartConfig = {
    backgroundGradientFrom: '#20211f',

    backgroundGradientTo: '#20211f',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: 10,
          marginLeft: 10,
        }}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectCategory(index, category.num)}>
            <View
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedCategory === index ? '#20211f' : bgGlassLight, // Change the color based on selection
                borderRadius: 20,
                paddingVertical: 10,
                paddingHorizontal: 10,
                marginRight: 10,
              }}>
              <Text
                style={{
                  color: selectedCategory === index ? 'white' : '#20211f',
                }}>
                {category.num}
              </Text>
              <Text
                style={{
                  color: selectedCategory === index ? 'white' : '#20211f',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>
                {category.month}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#20211f',
          borderRadius: 25,
          padding: 5,
          alignItems: 'center',
          marginHorizontal: 10,
          borderBottomColor: 'rgba(26, 255, 146, 1)',
          borderBottomWidth: 2,
        }}>
        <View style={{ marginHorizontal: 15 }}>
          <FontAwesome5
            name="walking"
            size={24}
            color="rgba(26, 255, 146, 1)"
            style={{ marginVertical: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>
              {' '}
              {attended}/{days} days
            </Text>
          </FontAwesome5>
          <Feather
            name="clock"
            size={24}
            color="rgba(26, 255, 146, .8)"
            style={{ marginVertical: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}> {total} hrs</Text>
          </Feather>
          <Octicons
            name="flame"
            size={24}
            color="rgba(26, 255, 146, .6)"
            style={{ marginVertical: 10 }}>
            <Text style={{ color: 'white', fontSize: 20 }}> 2110 cals</Text>
          </Octicons>
        </View>
        <ProgressChart
          data={data}
          width={screenWidth / 2}
          height={screenWidth / 2}
          chartConfig={chartConfig}
          hideLegend={true}
          strokeWidth={16}
          radius={32}
          style={{ borderRadius: 25 }}
        />
      </View>
    </View>
  );
};

export default CircleGraph;
