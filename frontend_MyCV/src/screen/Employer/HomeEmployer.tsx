//Giang
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import InforEmployer from '../Admin/InforEmployers';
import { Navigation } from '@mui/icons-material';

import { NavigationProp } from '@react-navigation/native';

const HomeEmployer = ({ navigation }: { navigation: NavigationProp<any> }) => {
    return (
        <View>
            <Text>Home Employer</Text>

            <TouchableOpacity onPress={()=>navigation.navigate('InforEmployer')} style={styles.btn}>
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
    btn:{
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        color: 'black',
    }
});