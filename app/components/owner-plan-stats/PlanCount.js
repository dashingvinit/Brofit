import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { neon } from '../../constants/Constants';

const PlanCount = ({ count }) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.gradientContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>PLANS</Text>
          <TouchableOpacity>
            <View style={styles.resetButton}>
              <MaterialCommunityIcons
                name="chart-bubble"
                size={24}
                color={neon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.waterText}>
          {count} <Text style={styles.waterUnit}>TOTAL</Text>
        </Text>
        <View style={styles.waterRow}>
          <MaterialCommunityIcons
            name="chart-scatter-plot"
            size={24}
            color="#E9B824">
            <Text style={styles.waterValue}></Text>
          </MaterialCommunityIcons>

          <MaterialCommunityIcons
            name="chart-timeline-variant"
            size={24}
            color="#219C90"
            style={styles.waterPlusButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderRadius: 15,
    height: 150,
    overflow: 'hidden', // Clip child Views to the container's border
  },
  gradientContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: '#e3e3e3',
    fontSize: 28,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    borderRadius: 10,
  },
  waterText: {
    color: '#e3e3e3',
    fontSize: 20,
    marginVertical: 5,
    marginBottom: 10,
  },
  waterUnit: {
    fontSize: 14,
  },
  waterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waterValue: {
    color: '#e3e3e3',
    fontSize: 12,
  },
  waterPlusButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 4,
    borderRadius: 10,
  },
});

export default PlanCount;
