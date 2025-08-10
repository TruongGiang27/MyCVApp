import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScreenName from '../../constants/ScreenName';
import RootStackParamList from '../../navigator/RootStackParamList';
import { BASE_URL } from '../../utils/url';

type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const EditInfoEmployer = ({ navigation, route }: Props) => {
    const { userId } = route.params as { userId: string };
    const [user, setUser] = useState<any>();
    const [formData, setFormData] = useState({
        id: '',
        userId: '',
        selectedCompany: '',
        companyName: '',
        numberOfEmployees: '',
        fullName: '',
        howDidYouHear: '',
        phoneNumber: '',
        describe: '',
    });
    useEffect(() => {
        const getInfo = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const parse = JSON.parse(userInfo);
                setUser(parse)
            }
        };
        const fetchEmployerData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/employers/${userId}`);
                const data = response.data;
                setFormData(data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu:', error);
                Alert.alert('Lỗi', 'Không thể lấy dữ liệu. Vui lòng thử lại.');
            }
        }
        getInfo();
        fetchEmployerData();
    }, []);

    const [loading, setLoading] = useState(false);

    const handleInputChange = (field: string, value: any) => {
        setFormData((prevData: any) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`${BASE_URL}/employers/${formData.id}`, formData);
            Alert.alert('Thành công', 'Cập nhật CV thành công!');
            navigation.navigate('InfoEmployer', { userId: userId, updated: true });
        } catch (error) {
            console.error('Lỗi khi cập nhật CV:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật CV. Vui lòng thử lại.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Đang tải dữ liệu...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Icon style={styles.arrow} name="arrow-back-outline" size={28} color="#fffff" onPress={() => navigation.goBack()} />
                <Text style={styles.title}>CHỈNH SỬA THÔNG TIN CÔNG TY</Text>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên công ty</Text>
                <TextInput
                    style={styles.input}
                    value={formData.companyName}
                    onChangeText={(text) => handleInputChange('companyName', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Loại hình công ty</Text>
                <TextInput
                    style={styles.input}
                    value={formData.selectedCompany}
                    onChangeText={(text) => handleInputChange('selectedCompany', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Số lượng nhân viên</Text>
                <TextInput
                    style={styles.input}
                    value={formData.numberOfEmployees}
                    onChangeText={(text) => handleInputChange('numberOfEmployees', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Tên người liên hệ</Text>
                <TextInput
                    style={styles.input}
                    value={formData.fullName}
                    onChangeText={(text) => handleInputChange('fullName', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    value={formData.phoneNumber}
                    onChangeText={(text) => handleInputChange('phoneNumber', text)}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Mô tả công ty</Text>
                <TextInput
                    style={styles.inputMultiline}
                    value={formData.describe}
                    onChangeText={(text) => handleInputChange('describe', text)}
                    multiline
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Quý công ty biết đến ứng dụng qua</Text>
                <TextInput
                    style={styles.input}
                    value={formData.howDidYouHear}
                    onChangeText={(text) => handleInputChange('howDidYouHear', text)}
                />
            </View>

            {/* Thêm các trường khác như địa chỉ, kỹ năng, học vấn, kinh nghiệm... */}
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>Lưu thay đổi</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
        flexGrow: 1,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#011F82',
        padding: 16,
        borderRadius: 10,
    },
    arrow: {
        marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },

    inputGroup: {
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
        fontWeight: '600',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333',
        backgroundColor: '#f9f9f9',
    },

    saveButton: {
        backgroundColor: '#011F82',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        fontSize: 16,
        color: '#3333',
    },

    scrollViewContent: {
        paddingVertical: 20,
    },

    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#011F82',
        marginBottom: 10,
    },

    inputMultiline: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: '#333',
        backgroundColor: '#f9f9f9',
        minHeight: 60,
        textAlignVertical: 'top',
    },
});

export default EditInfoEmployer;
