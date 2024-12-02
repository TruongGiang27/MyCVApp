//Uyên
//+1popup contact
import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../utils/url';
import { RootStackParamList } from '../User/types';
import { useNavigation } from '@react-navigation/native';

interface cv_form {
    _id: string;
    userId: string;
    fullname: string;
    email: string;
    phone: string;
    address: string;
    education: string;
    experience: string;
    skills: string;
    certifications: string;
    birthDate: string;
    summary: string;
    jobPreferences: string;
}
// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'ApplyManager'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
};



const CVDetail: React.FC<Props> = ({ navigation }) => {
    const [cv, setCv] = useState<cv_form[]>([]);
    const [name, setName] = useState<string>();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const route = useRoute();

    const { cvId, disableButtons } = route.params ? route.params as { cvId: string, disableButtons: boolean } : { cvId: '', disableButtons: false };

    
    useEffect(() => {
        const fetchCv = async () => {
            const { userId } = route.params as { userId: string };

            try {
                const response = await axios.get(`${BASE_URL}/cv_form/${userId}`);
                setCv(response.data);
                setName(response.data.name);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCv();
    }, []);
    const BackHandler = () => {
        navigation.goBack();
    }
    const initials = name
        ? name.split(' ').map((word: string) => word[0]).join('').toUpperCase()
        : 'U';

    const cancelRefuse = () => {
        setIsModalVisible(false);
    };

    const confirmRefuse = () => {
        setIsModalVisible(true);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} />
                    <Text style={styles.headerText}>Chi tiết CV</Text>
                </View>
                <View style={styles.avatar}>
                    <Text style={styles.initials}>{initials}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
                {cv.map((item: any, index: number) => (
                    <View style={styles.info} key={index}>
                        <View style={styles.infoCv}>
                            <View style={styles.email}>
                                <Icon name="mail" size={20} color="#011F82" />
                                <Text style={{ marginLeft: 10 }}>{item.email}</Text>
                            </View>
                            <Text>{item.phone}</Text>
                        </View>
                        <View style={styles.edit}>
                            <Icon name="create-outline" size={20} color="#011F82" />
                        </View>
                    </View>
                ))}
                <View style={styles.detail}>
                    <Text>Thông tin cá nhân</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>Họ và tên: {item.fullname}</Text>
                            <Text>Ngày sinh: {item.birthDate}</Text>
                            <Text>Địa chỉ: {item.address}</Text>
                            <Text>Tóm tắt: {item.summary}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.detail}>
                    <Text>Thông tin học vấn</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>Trình độ học vấn: {item.education}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.detail}>
                    <Text>Kinh nghiệm làm việc</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>Công ty: {item.experience}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.detail}>
                    <Text>Kỹ năng</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>{item.skills}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.detail}>
                    <Text>Chứng chỉ</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>{item.certifications}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.detail}>
                    <Text>Ưu tiên công việc</Text>
                    {cv.map((item: any, index: number) => (
                        <View key={index}>
                            <Text>{item.jobPreferences}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SendSMS' as never)}>
                        <Text style={{ color: '#fff' }}>Liên hệ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonRefuse ,disableButtons && styles.disabledButton]} onPress={confirmRefuse} disabled={disableButtons}>
                        <Text style={{ color: '#fff' }}>Từ chối</Text>
                    </TouchableOpacity>
                    <Modal
                        visible={isModalVisible}
                        transparent={true}
                        animationType="slide"
                        onRequestClose={cancelRefuse}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText}>Bạn có chắc chắn muốn từ chối ứng viên này không ?</Text>
                                <View style={styles.modalButtons}>
                                    <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('ApplyManager' as never)}>
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
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#6D92D0',
        marginLeft: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#011F82',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 20,
    },
    initials: {
        color: '#fff',
        fontSize: 40,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#F5F5F5',
        marginTop: 10,
    },
    info: {
        padding: 16,
        marginTop: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#011F82',
    },
    email: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        color: '#011F82',
    },
    infoCv: {
        width: '90%',
    },
    edit: {
        width: 40,
        height: 40,
        borderRadius: 20,
        // backgroundColor: '#011F82',
        justifyContent: 'center',
        alignItems: 'center',
    },

    detail: {
        width: '100%',
        height: 400,
        padding: 16,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    btn: {
        width: '100%',
        padding: 16,
        marginTop: 20,
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#011F82',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    buttonRefuse: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF0000',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
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
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    modalText: {
        fontSize: 20,
        marginBottom: 20,
        color: '#011F82',
        textAlign: 'center',
    },
    modalButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        width: '40%',
        height: 40,
        backgroundColor: '#011F82',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalButtonText: {
        color: '#fff',
    },

});