//Giang
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import InforEmployer from '../Admin/InforEmployers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../User/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRadioGroup } from '@mui/material';

// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'CreateEmployer'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};
const HomeEmployer: React.FC<Props> = ({ navigation }) => {
    const { width } = useWindowDimensions();  // Get the current screen width
    const logoWidth = width * 0.5;
    return (
        <View style={styles.container}>

        </View>
    );
};
export default HomeEmployer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
    },
    
    logo: {
        resizeMode: 'contain',
    },


});