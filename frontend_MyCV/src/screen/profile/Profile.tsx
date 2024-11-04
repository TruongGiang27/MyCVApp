import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  // Dùng Icon Ionicons, có thể đổi theo ý bạn.

const { width, height } = Dimensions.get('window');

const UploadCVScreen = () => {
    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Icon name="arrow-back" size={25} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thêm CV vào Indeed</Text>
            </View>

            {/* Content */}
            <View style={styles.content}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Tải lên CV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Xây dựng Indeed CV</Text>
                </TouchableOpacity>
                <Text style={styles.agreementText}>
                    Bằng cách tiếp tục, bạn đồng ý nhận các cơ hội việc làm từ Indeed.
                </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.copyright}>©2024 Indeed - </Text>
                <Text style={styles.footerLink}>Cookie, Quyền riêng tư và Điều khoản</Text>
            </View>

            {/* Navigation Bar */}
            <View style={styles.navBar}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home-outline" size={25} color="#000" />
                    <Text style={styles.navText}>Trang chủ</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="bookmark-outline" size={25} color="#000" />
                    <Text style={styles.navText}>Việc làm của tôi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="chatbubble-outline" size={25} color="#000" />
                    <Text style={styles.navText}>Tin nhắn</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="person-outline" size={25} color="#007AFF" />
                    <Text style={[styles.navText, { color: '#007AFF' }]}>Hồ sơ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        width: width * 0.9,
        paddingVertical: 15,
        borderRadius: 8,
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    agreementText: {
        color: '#666',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    footer: {
        alignItems: 'center',
        paddingBottom: 10,
    },
    copyright: {
        fontSize: 12,
        color: '#666',
    },
    footerLink: {
        fontSize: 12,
        color: '#007AFF',
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#000',
        marginTop: 5,
    },
});

export default UploadCVScreen;
