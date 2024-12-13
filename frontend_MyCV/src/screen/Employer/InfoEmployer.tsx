import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { RootStackParamList } from '../../navigator/RootStackParamList';

type Props = NativeStackScreenProps<RootStackParamList, 'InfoEmployer'>;

const InfoEmployer = ({ navigation, route }: Props) => {
    const { userId } = route.params as { userId: string };
    const [user, setUser] = useState<any>();
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyEmail, setCompanyEmail] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [companyDescription, setCompanyDescription] = useState('');
    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUser(JSON.parse(userInfo));
                console.log("------------------");
                console.log("userInfo", userInfo);
            }
        };
        getInfo();
    }, []);



    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>Company Name</Text>
            <Text>{companyName}</Text>
            <Text style={styles.label}>Company Address</Text>
            <TextInput
                style={styles.input}
                value={companyAddress}
                onChangeText={setCompanyAddress}
                placeholder="Enter company address"
            />
            <Text style={styles.label}>Company Email</Text>
            <TextInput
                style={styles.input}
                value={companyEmail}
                onChangeText={setCompanyEmail}
                placeholder="Enter company email"
                keyboardType="email-address"
            />
            <Text style={styles.label}>Company Phone</Text>
            <TextInput
                style={styles.input}
                value={companyPhone}
                onChangeText={setCompanyPhone}
                placeholder="Enter company phone"
                keyboardType="phone-pad"
            />
            <Text style={styles.label}>Company Description</Text>
            <TextInput
                style={styles.textArea}
                value={companyDescription}
                onChangeText={setCompanyDescription}
                placeholder="Enter company description"
                multiline
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        height: 100,
    },
});

export default InfoEmployer;