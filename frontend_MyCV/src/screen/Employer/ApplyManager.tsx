import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../utils/url';


// Cấu trúc dữ liệu của Employer dựa trên các trường từ JobPost
interface Employer {
    _id: string;
    jobId: string;
    jobName: string;
    cvId: string;
    CVfullNameUser: string;
    CVEmailUser: string;
    status: string;
}

const ApplyManager = () => {
    const navigation = useNavigation();
    const [employers, setEmployers] = useState<Employer[]>([]);
    const [viewingEmployer, setViewingEmployer] = useState<Employer | null>(null);
    const [formData, setFormData] = useState<Employer | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredEmployers, setFilteredEmployers] = useState<Employer[]>([]); // Lưu danh sách đã lọc
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/applications`); // Đường dẫn API từ JobPost
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching cv data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = () => {
        const results = employers
            .filter(emp =>
                emp.CVfullNameUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.CVEmailUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.status.toLowerCase().includes(searchQuery.toLowerCase())
            )
        setFilteredEmployers(results);
    };

    const handleViewDetails = (employer: Employer) => {
        setViewingEmployer(employer);
        setFormData(employer);
    };
    const displayEmployers = (filteredEmployers.length > 0 ? filteredEmployers : employers).slice(0, 3);



    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={() => navigation.goBack()} />
                <Text style={styles.pageTitle}>Danh sách ứng viên</Text>
            </View>
                <View style={styles.searchSection}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.buttonSearch} onPress={handleSearch}>
                        <Text style={styles.searchButtonText}>Search</Text>
                    </TouchableOpacity>
                </View>

            {displayEmployers.map(employer => (
                <View style={styles.employerContainer} key={employer._id}>
                    <View style={styles.employerInfo}>
                        <Text style={styles.jobTitle}>{employer.CVfullNameUser}</Text>
                        <Text style={styles.jobLocation}>{employer.CVEmailUser}</Text>
                        <Text style={styles.jobDetail}>{employer.status}</Text>
                    </View>
                    <View style={styles.actionIconsRight}>
                        <Icon name="eye" size={20} color="#007bff" style={styles.iconButton} onPress={() => handleViewDetails(employer)} />
                    </View>
                </View>
            ))}
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#f5f5f5'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 20
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333'
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        marginHorizontal: 20
    },
    searchIcon: {
        paddingHorizontal: 10
    },
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        fontSize: 16
    },
    buttonSearch: {
        backgroundColor: '#007bff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginLeft: 10
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16
    },
    employerContainer: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        borderColor: '#ddd',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    employerInfo: {
        flex: 3
    },
    jobTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    jobLocation: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5
    },
    jobDetail: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10
    },
    actionIconsRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flex: 1,
        marginLeft: 15
    },
    iconButton: {
        marginLeft: 15
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    employerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },
    detailRow: {
        marginBottom: 15,
    },
    titleText: {
        fontSize: 18,
        color: '#011F82',
        fontWeight: 'bold',
    },
    viewText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 10,
    },
    buttonCancel: {
        backgroundColor: '#011F82',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    textbtn: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonEdit: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 15,
        marginTop: 10
    },
    inputGroup: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        color: '#011F82',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        color: '#333',
    },
    inputDescription: {
        height: 80,
        textAlignVertical: 'top'
    }
});

export default ApplyManager;
