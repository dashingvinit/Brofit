import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { bgColor, bgLight, neon } from '../constants/Constants';

const AdminPage = () => {
  const handleAddGym = () => {
    // Add gym functionality logic
    alert('Adding gym...');
  };

  const handleUsersRole = () => {
    // Users role functionality logic
    alert('Setting users role...');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Admins</Text>
        <TouchableOpacity
          onPress={() => handleAddGym()}
          style={styles.userContainer}
        >
          <Text style={styles.userText}>Add Gym</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleUsersRole()}
          style={styles.userContainer}
        >
          <Text style={styles.userText}>User</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    marginTop: 50,
    backgroundColor: bgLight,
    borderRadius: 40,
    width: 200,
  },
  userText: {
    fontSize: 20,
    color: neon,
  },
});

export default AdminPage;
