import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import axios from './constants/Axios';
import { Calendar } from 'react-native-calendars';
import { COLORS } from './constants';
import FetchQuote from './FetchQuote';

const Attendance = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get('/userProfile/64aac9534926e670d0a3ef86');
      
      const markedDatesData = {};
      const eventsData = response.data.map((attendance) => {
        const [year, month, day] = attendance.date.split('-');
        const [hours, minutes] = attendance.time.split(':');
        const startDate = new Date(year, month - 1, day, hours, minutes);
        const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000);

        markedDatesData[attendance.date] = { selected: true, marked: true };

        return {
          title: 'Attendance',
          start: startDate,
          end: endDate,
        };
      });

      setMarkedDates(markedDatesData);
      setEvents(eventsData);
    } catch (error) {
      alert(error);
    }
  };

  const handleCheckIn = async () => {
    try {
      const response = await axios.post('/attendance');
      alert('Done');
      fetchAttendanceData();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        alert('Internal Server Error: Please try again later.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  const eventContent = () => {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 18 }}>🎯</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black, paddingTop: 80 }}>
      <View style={{ flex: 1 }}>
        <Calendar
          style={{ borderRadius: 25, elevation: 4, margin: 10, backgroundColor: COLORS.gray }}
          markedDates={markedDates}
          events={events}
          eventContent={eventContent}
        />
      </View>

      {/* Fitness Quotes */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 130 }}>
        <TouchableOpacity>
          <FetchQuote />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 30, paddingVertical: 20 }}>
        <TouchableOpacity
          style={{ backgroundColor: COLORS.gray3, paddingVertical: 20, paddingHorizontal: 20, borderRadius: 30 }}
          onPress={handleCheckIn}
        >
          <Text style={{ color: COLORS.lightWhite, fontWeight: 'bold' }}>     CheckIN     </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ backgroundColor: COLORS.gray3, paddingVertical: 20, paddingHorizontal: 20, borderRadius: 30 }}
          onPress={() => {
            // code that handles the checkout button press
          }}
        >
          <Text style={{ color: COLORS.lightWhite, fontWeight: 'bold' }}>    CheckOUT    </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attendance;
