//Uyên
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Icon } from 'react-native-elements';
import  Icon  from 'react-native-vector-icons/FontAwesome';

const Service = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    return (
        <View style={styles.container}>
            <h1>Service</h1>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    image: {
        width: 50,
        height: 50,
    },
    text: {
        fontSize: 16,
    },
});
export default Service;