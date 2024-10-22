import axios from 'axios';
import mongoose from 'mongoose';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';


interface Employer {
    id: string;
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
                const response = await axios.get('http://10.102.74.123:3000/employers');
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = async (employer: Employer) => {
        try {
            // Ensure the id is a valid ObjectId
            if (mongoose.Types.ObjectId.isValid(employer.id)) {
                throw new Error('Invalid ObjectId');
            }
    
            const response = await axios.put(`http://10.102.74.123:3000/employers/${employer.id}`, employer);
            setEmployers(employers.map(emp => emp.id === employer.id ? response.data : emp));
            Alert.alert('Update', `Updated employer: ${employer.companyName}`);
        } catch (error) {
            Alert.alert('Error', 'Error updating employer');
            console.error('Error updating employer:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            // Ensure the id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ObjectId');
            }

            await axios.delete(`http://10.102.74.123:3000/employers/${id}`);
            setEmployers(employers.filter(emp => emp.id !== id));
            Alert.alert('Delete', `Deleted employer: ${id}`);
        } catch (error) {
            Alert.alert('Error', 'Error deleting employer');
            console.error('Error deleting employer:', error);
        }
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.pageTitle}>Employer Information</Text>
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
        backgroundColor: '#f5f5f5',
    },
    container: {
        padding: 20,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6200ee',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: '#6200ee',
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#6200ee',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 5,
        // fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
    },

    employerContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderColor: '#6200ee',
        borderWidth: 1,
    },

    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#6200ee',
    },
});

export default InforEmployer;