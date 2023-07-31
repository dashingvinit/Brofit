import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import {
  bgColor,
  bgLight,
  neon,
  bgGlassLight,
  bgGlass,
} from '../constants/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GradientBG, Hr, TopBack } from '../components';

const OwnerProfile = () => {
  return (
    <GradientBG>
      <SafeAreaView style={{ flex: 1 }}>
        <TopBack>OwnerProfile</TopBack>
      </SafeAreaView>
    </GradientBG>
  );
};

export default OwnerProfile;
