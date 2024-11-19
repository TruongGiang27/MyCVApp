//Uyên
//+1popup contact
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../User/types';
import { BASE_URL } from '../utils/url';
// Khai báo kiểu cho props 'navigation'
type CreateEmployerScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'CVDetail'
>;

type Props = {
    navigation: CreateEmployerScreenNavigationProp;
    // name: string;
};

const CVDetail: React.FC<Props> = ({ navigation}) => {
    const [cv, setCv] = useState<any>();
    const [name, setName] = useState<string>();
    const BackHandler = () => {
        navigation.goBack();
    }
    const initials = name
        ? name.split(' ').map((word: string) => word[0]).join('').toUpperCase()
        : 'U';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/cv_form`);
                setCv(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon name="arrow-back-outline" size={28} color="#011F82" onPress={BackHandler} />
                    <Text style={styles.headerText}>CV chi tiết</Text>
                </View>
                <View style={styles.avatar}>
                    <Text style={styles.initials}>{initials}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
                <View style={styles.info}>
                    <View style={styles.infoCv}>
                        <Text style={styles.email}>Email: {cv?.email}</Text>
                        <Text>Ngày sinh: {cv?.dob}</Text>
                </View>
                </View>
                <View style={styles.detail}>
                    <Text>{cv?.description}</Text>
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
        color: '#011F82',
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
    },
    email: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
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
});