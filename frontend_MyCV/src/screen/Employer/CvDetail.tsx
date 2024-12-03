import { useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL } from '../../utils/url';
import { RootStackParamList } from '../User/types';
interface cv_form {
    _id: string;
    userId: string;
    fullname: string;
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

    const initials = name ? name.split(' ').map(n => n[0]).join('') : 'U';
    const route = useRoute();
    useEffect(() => {
        console.log("Route params:", route.params);
    }, [route.params]);
    
    const BackHandler = () => {
        navigation.goBack();
    }
    const {cvId} = route.params as {cvId: string };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/cv_form/${cvId}`);
                const data = await response.json();
                setCv(data);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu CV:", error);
            }
        };
        fetchData();
    }, [cvId]);
    const confirmRefuse = () => {
        setIsModalVisible(false);
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
                <Text style={styles.name}>{name || 'Đang tải...'}</Text>

                <View style={styles.info}>
                    <View style={styles.infoCv}>
                        <Text style={{ fontSize: 20, color: '#011F82' }}>Email:</Text>
                        <View style={styles.email}>
                            <Icon name="mail" size={20} color="#011F82" />
                            <Text style={{ fontSize: 17, color: '#011F82', marginLeft: 10 }}>{cv?.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.detail}>
                    <Text style={{fontSize: 20, color: '#011F82' }}>Thông tin cá nhân:</Text>
                    <Icon name="location" size={20} color="#011F82" />
                    <Text style={{fontSize: 17}}>{cv?.address?.address}</Text>

                    <Text>{cv?.address?.city}</Text>
                    <Text>{cv?.address?.country}</Text>
                    <Text>{cv?.phone}</Text>
                    <Text>{cv?.birthDate}</Text>
                    <Text>{cv?.summary}</Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: '#fff' }}>Liên hệ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.buttonRefuse]}
                        onPress={confirmRefuse}
                        // disabled={disableButtons}
                    >
                        <Text style={{ color: '#fff' }}>Từ chối</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );

};

export default CVDetail;

const styles = StyleSheet.create({
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#888',

    },
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
        fontSize: 20,

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
        color: '#011F82',

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