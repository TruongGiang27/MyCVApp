import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Navbar from '../../components/Navbar';
import ScreenName from '../../constants/ScreenName';
import { RootStackParamList } from '../../navigator/RootStackParamList';
type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

const MessageScreen = ({navigation, route} : Props) => {
    const navigationCVCreate = useNavigation<NavigationProp<any>>();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Hộp thư đến */}
            <View style={styles.inboxHeader}>
                <Text style={styles.inboxTitle}>Hộp thư đến</Text>
            </View>

            {/* Nội dung chính */}
            <View style={styles.header}>
                <Text style={styles.title}>Chào mừng bạn đến phần Tin nhắn</Text>
                <Text style={styles.subtitle}>
                    Khi nhà tuyển dụng liên hệ với bạn, bạn sẽ thấy tin nhắn ở đây.
                </Text>
            </View>

            {/* Các nút */}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.buttonPrimary} onPress={() => navigation.navigate('Home' as never)}>
                    <Text style={styles.buttonText}>Tìm việc làm</Text>
                </TouchableOpacity>
                <View style={styles.spacer} />
                <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigationCVCreate.navigate('CVCreate')}>
                    <Text style={styles.buttonTextSecondary}>Tạo CV của bạn</Text>
                </TouchableOpacity>
            </View>

            <View>
                <Navbar navigation={navigation} route={route} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF', // Nền trắng
        justifyContent: 'flex-start', // Căn nội dung bắt đầu từ trên cùng
        alignItems: 'center',
    },
    inboxHeader: {
        width: '100%',
        padding: 15,
        backgroundColor: '#F0F0F0', // Màu nền của header hộp thư
        borderBottomColor: '#B9D6F3', // Đường viền dưới
        borderBottomWidth: 1,
        alignItems: 'center',
        marginBottom: 100,
    },
    inboxTitle: {
        color: '#011F82', // Màu chữ hộp thư
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 240,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
        marginTop: 20, // Khoảng cách giữa hộp thư và phần nội dung
    },
    title: {
        color: '#011F82', // Màu chữ tiêu đề
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subtitle: {
        color: '#6D92D0', // Màu subtitle
        textAlign: 'center',
        marginTop: 10,
        fontSize: 18,
        paddingHorizontal: 20,
    },
    buttonsContainer: {
        width: '80%',
    },
    spacer: {
        height: 20,
    },
    buttonPrimary: {
        backgroundColor: '#011F82', // Nút tìm việc làm màu xanh đậm
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonSecondary: {
        borderColor: '#B9D6F3', // Viền khung của nút tạo CV
        borderWidth: 2,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF', // Màu chữ trong nút chính (Tìm việc làm)
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonTextSecondary: {
        color: '#011F82', // Màu chữ trong nút phụ (Tạo CV)
        fontSize: 16,
        fontWeight: 'bold',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#FFF', // Nền trắng giống như trên hình
        position: 'absolute', // Đưa thanh navbar xuống dưới
        bottom: 0, // Căn dưới cùng màn hình
        width: '100%',
    },
    navItem: {
        alignItems: 'center',
        paddingVertical: 8, // Tăng padding dọc cho icon và text
    },
    navText: {
        fontSize: 12,
        color: '#000', // Màu đen cho text các tab khác
        marginTop: 5,
    },
});

export default MessageScreen;



