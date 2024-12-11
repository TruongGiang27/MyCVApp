import { Picker } from '@react-native-picker/picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../utils/url';
import { RootStackParamList } from '../../navigator/RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenName from '../../constants/ScreenName';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const EmployerDetail = () => {
  return (
    <View>
      <Text>EmployerDetail</Text>
    </View>
  )
}

export default EmployerDetail