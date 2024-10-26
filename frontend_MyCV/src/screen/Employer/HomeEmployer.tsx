//Giang
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InforEmployer from '../Admin/InforEmployers';
import { Navigation } from '@mui/icons-material';

import { NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: undefined;
    JobPost: undefined;
};

// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'CreateEmployer'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};
const HomeEmployer: React.FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text>Home Employer</Text>

            <TouchableOpacity onPress={() => navigation.navigate('InforEmployer')} style={styles.btn}>
                <Text>Employer</Text>
            </TouchableOpacity>
        </View>
    );
};
export default HomeEmployer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
    }
});