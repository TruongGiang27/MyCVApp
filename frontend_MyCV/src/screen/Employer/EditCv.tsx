//Uyên
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from '../../components/Navbar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { BASE_URL } from '../utils/url';
import { RootStackParamList } from '../User/types'
// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'EditCv'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};

const EditCv: React.FC<Props> = ({ navigation}) => {
    return (
        <View>
            <Text>Edit CV Screen</Text>
        </View>
    );
}
export default EditCv;