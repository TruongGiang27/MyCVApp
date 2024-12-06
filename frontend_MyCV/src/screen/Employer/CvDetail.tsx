import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import axios from 'axios';
import { Icon } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BASE_URL } from '../../utils/url';
import { RootStackParamList } from '../User/types';
interface cv_form {
    _id: string;
    userId: string;
    fullName: string;
    email: string;
    phone: string;
    address: {
        country: string;
        city: string;
        address: string;
        zipCode: string;
    };
    education: {
        educationLevel: string;
        fieldOfStudy: string;
        schoolName: string;
        educationCountry: string;
        educationCity: string;
        educationStartDate: string;
        educationEndDate: string;
    };
    experience: {
        companyName: string;
        jobTitle: string;
        workCountry: string;
        workCity: string;
        workStartDate: string;
        workEndDate: string;
    };
    skills: string;
    certifications: string;
    birthDate: string;
    summary: string;
    jobPreferences: {
        desiredJobTitle: string;
        jobType: string;
        minimumSalary: string;
    };
}

type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'CVManagerment'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};

const CVDetail: React.FC<Props> = ({ navigation }) => {
    const [cv, setCv] = useState<cv_form>();
    const [name, setName] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const initials = cv?.email
        ? cv.email
            .split(' ') // Tách tên thành mảng các từ
            .map(word => word[0]) // Lấy chữ cái đầu của mỗi từ
            .join('') // Gộp lại thành một chuỗi
            .toUpperCase() // Chuyển thành chữ in hoa
        : 'CV';
    const route = useRoute();
    useEffect(() => {
        console.log("Route params:", route.params);
    }, [route.params]);

    const BackHandler = () => {
        navigation.goBack();
    }
    const { cvId, disableButtons, employerId } = route.params ? route.params as { cvId: string, disableButtons: boolean, employerId: string } : { cvId: '', disableButtons: false, employerId: '' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/cv_form/${cvId}`);
                const data = await response.json();
                console.log("CV data:", data);
                setCv(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu CV:", error);
            }
        };
        fetchData();
    }, [cvId]);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    };

    const cancelRefuse = async () => {
        setIsModalVisible(false);
    };

    //Từ chối cv
    const confirmRefuse = async () => {
        try {
            const response = await fetch(`${BASE_URL}/cv_form/${cvId}/decline/${employerId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            Alert.alert(result); // Thông báo cho người dùng về kết quả từ chối
            setIsModalVisible(false); // Đóng modal
        } catch (error) {
            console.error("Lỗi khi từ chối CV:", error);
        }
    };


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} />
                    <Text style={styles.headerText}>Chi tiết CV</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Text style={styles.initials}>{initials}</Text>
                    </View>
                    <Text style={styles.name}>{cv?.fullName}</Text>

                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Email:</Text>
                    <View style={styles.info}>
                        <Icon name="mail" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.email}</Text>
                    </View>
                </View>
                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Thông tin cá nhân:</Text>
                    <View style={styles.info}>
                        <Icon name="map-marker" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Vị trí: {cv?.address?.address}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.address?.city}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.address?.country}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="phone" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Số điện thoại: {cv?.phone}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="birthday-cake" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Sinh nhật: {cv?.birthDate ? formatDate(cv.birthDate) : 'N/A'}</Text>
                    </View>

                    <View style={styles.info}>
                        <Icon name="person-outline" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Tóm tắt về bản thân: {cv?.summary}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Học vấn:</Text>
                    <View style={styles.info}>
                        <Icon name="graduation-cap" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Trình độ: {cv?.education?.educationLevel}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="book" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngành học: {cv?.education?.fieldOfStudy}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="university" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Trường: {cv?.education?.schoolName}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.education?.educationCountry}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.education?.educationCity}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-alt" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày bắt đầu: {cv?.education?.educationStartDate ? formatDate(cv.education.educationStartDate) : 'N/A'}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày kết thúc: {cv?.education?.educationEndDate ? formatDate(cv.education.educationEndDate) : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Kinh nghiệm làm việc:</Text>
                    <View style={styles.info}>
                        <Icon name="building" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Công ty: {cv?.experience?.companyName}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="briefcase" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Chức vụ: {cv?.experience?.jobTitle}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="globe" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Quốc gia: {cv?.experience?.workCountry}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="city" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Thành phố: {cv?.experience?.workCity}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-alt" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày bắt đầu: {cv?.experience?.workStartDate ? formatDate(cv.experience.workStartDate) : 'N/A'}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Ngày kết thúc: {cv?.experience?.workEndDate ? formatDate(cv.experience.workEndDate) : 'N/A'}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Kỹ năng:</Text>
                    <View style={styles.info}>
                        <Icon name="cogs" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.skills}</Text>
                    </View>
                </View>


                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Chứng chỉ:</Text>
                    <View style={styles.info}>
                        <Icon name="certificate" type="font-awesome-5" size={20} color="#011F82" />
                        <Text style={styles.infoText}>{cv?.certifications}</Text>
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Mong muốn:</Text>
                    <View style={styles.info}>
                        <Icon name="briefcase" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Vị trí mong muốn: {cv?.jobPreferences?.desiredJobTitle}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="calendar-check" type="material-community" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Loại công việc: {cv?.jobPreferences?.jobType}</Text>
                    </View>
                    <View style={styles.info}>
                        <Icon name="money" type="font-awesome" size={20} color="#011F82" />
                        <Text style={styles.infoText}>Mức lương mong muốn: {cv?.jobPreferences?.minimumSalary} $</Text>
                    </View>
                </View>

                <View style={styles.btnGroup}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SendSMS', { phone: cv?.phone, fullName: cv?.fullName })}>
                        <Text style={styles.buttonText}>Liên hệ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonRefuse, disableButtons && styles.disabledButton]}
                        onPress={confirmRefuse}
                        disabled={disableButtons}
                    >
                        <Text style={styles.buttonText}>Từ chối</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={cancelRefuse}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Bạn có chắc chắn từ chối ứng viên này?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButton} onPress={confirmRefuse}>
                                        <Text style={styles.modalButtonText}>Xác nhận</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modalButton} onPress={cancelRefuse}>
                                        <Text style={styles.modalButtonText}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </View>
        </ScrollView>
    );

};

export default CVDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8', // Nền màu trung tính
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff', // Header nền trắng
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc', // Đường viền nhạt
        elevation: 4,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 10,
    },
    avatarContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#6C63FF', // Avatar gradient
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6, // Đổ bóng
    },
    initials: {
        color: '#FFFFFF',
        fontSize: 48,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#011F82',
    },
    infoCard: {
        marginHorizontal: 16,
        marginTop: 20,
        backgroundColor: '#ffffff', // Màu nền card
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    infoTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#011F82',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 17,
        color: '#4B5563',
        lineHeight: 18,
        marginLeft: 8,
    },
    btnGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        marginTop: 24,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#6C63FF', // Màu xanh gradient
        elevation: 4, // Tạo bóng
    },
    buttonRefuse: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 8,
        backgroundColor: '#EF4444', // Màu đỏ từ chối
        elevation: 4,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: '#011F82',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#011F82',
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
