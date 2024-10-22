import { StyleSheet, ScrollView, View, Text } from 'react-native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Employer {
    selectedCompany: string;
    companyName: string;
    numberOfEmployees: number;
    fullName: string;
    howDidYouHear: string;
    phoneNumber: string;
    describe: string;
}

const InforEmployer: React.FC = () => {
    const [employers, setEmployers] = useState<Employer[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.102.70.158:3000/employers');
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Employer Information</Text>
                {employers.map((employer, index) => (
                    <View key={index} style={styles.employerContainer}>
                        <Text style={styles.text}>Selected Company: {employer.selectedCompany}</Text>
                        <Text style={styles.text}>Company Name: {employer.companyName}</Text>
                        <Text style={styles.text}>Number of Employees: {employer.numberOfEmployees}</Text>
                        <Text style={styles.text}>Full Name: {employer.fullName}</Text>
                        <Text style={styles.text}>How Did You Hear: {employer.howDidYouHear}</Text>
                        <Text style={styles.text}>Phone Number: {employer.phoneNumber}</Text>
                        <Text style={styles.text}>Describe: {employer.describe}</Text>
                    </View>
                ))}

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    employerContainer: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default InforEmployer;