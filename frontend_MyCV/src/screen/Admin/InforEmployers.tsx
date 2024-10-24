import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

const InforEmployer = () => {
    const [employers, setEmployers] = useState<Employer[]>([]);
    const [editingEmployer, setEditingEmployer] = useState<Employer | null>(null);
    const [originalData, setOriginalData] = useState<Employer | null>(null); // Lưu trữ dữ liệu gốc
    const [formData, setFormData] = useState<Employer | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://192.168.1.15:3000/employers');
                setEmployers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleUpdate = (employer: Employer) => {
        setEditingEmployer(employer); // Mở form update với employer đã chọn
        setOriginalData(employer); // Lưu trữ dữ liệu ban đầu trước khi chỉnh sửa
        setFormData(employer); // Điền sẵn dữ liệu của employer vào form để chỉnh sửa
    };

    const handleSave = async () => {
        if (formData) {
            try {
                const response = await axios.patch(`http://192.168.1.15:3000/employers/${formData.id}`, formData);
                setEmployers(employers.map(emp => emp.id === formData.id ? response.data : emp));
                setEditingEmployer(null); // Đóng form sau khi update thành công
                Alert.alert('Update', `Updated employer: ${formData.companyName}`);
            } catch (error) {
                Alert.alert('Error', 'Error updating employer');
                console.error('Error updating employer:', error);
            }
        }
    };

    const handleCancel = () => {
        setFormData(originalData); // Trả lại dữ liệu ban đầu khi người dùng huỷ
        setEditingEmployer(null); // Đóng form chỉnh sửa
    };

    const handleInputChange = (key: keyof Employer, value: string) => {
        setFormData(prev => prev ? { ...prev, [key]: value } : null);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://192.168.1.15:3000/employers/${id}`);
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
                {editingEmployer ? (
                    // Form để chỉnh sửa employer
                    <View style={styles.formContainer}>
                        <Text style={styles.formTitle}>Edit Employer</Text>
                        <TextInput
                            style={styles.input}
                            value={formData?.companyName}
                            onChangeText={text => handleInputChange('companyName', text)}
                            placeholder="Company Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={formData?.selectedCompany}
                            onChangeText={text => handleInputChange('selectedCompany', text)}
                            placeholder="Selected Company"
                        />
                        <TextInput
                            style={styles.input}
                            value={formData?.numberOfEmployees.toString()}
                            onChangeText={text => handleInputChange('numberOfEmployees', text)}
                            placeholder="Number of Employees"
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={formData?.fullName}
                            onChangeText={text => handleInputChange('fullName', text)}
                            placeholder="Full Name"
                        />
                        <TextInput
                            style={styles.input}
                            value={formData?.phoneNumber}
                            onChangeText={text => handleInputChange('phoneNumber', text)}
                            placeholder="Phone Number"
                        />
                        <TextInput
                            style={styles.input}
                            value={formData?.describe}
                            onChangeText={text => handleInputChange('describe', text)}
                            placeholder="Describe"
                        />

                        <TouchableOpacity style={styles.buttonEdit} onPress={handleSave}>
                            <Text style={styles.textbtn}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={handleCancel}>
                            <Text style={styles.textbtn}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    // Hiển thị danh sách employers
                    employers.slice(0,5).map((employer, index) => (
                        <View key={index} style={styles.employerContainer}>
                            <Text style={styles.text}>Selected Company: {employer.selectedCompany}</Text>
                            <Text style={styles.text}>Company Name: {employer.companyName}</Text>
                            <Text style={styles.text}>Number of Employees: {employer.numberOfEmployees}</Text>
                            <Text style={styles.text}>Full Name: {employer.fullName}</Text>
                            <Text style={styles.text}>Phone Number: {employer.phoneNumber}</Text>
                            <Text style={styles.text}>Describe: {employer.describe}</Text>
                            <TouchableOpacity style={styles.buttonEdit} onPress={() => handleUpdate(employer)}>
                                <Text style={styles.textbtn}>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonDelete} onPress={() => handleDelete(employer.id)}>
                                <Text style={styles.textbtn}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
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

    input: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        fontSize: 16,
        color: '#011F82',
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
        color: '#6200ee',
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#6200ee',
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
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        borderColor: '#6200ee',
        borderWidth: 1,
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#6200ee',
    },

    buttonEdit: {
        backgroundColor: '#6200ee',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonCancel: {
        backgroundColor: '#808080',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: '#ff0000',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    textbtn: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default InforEmployer;