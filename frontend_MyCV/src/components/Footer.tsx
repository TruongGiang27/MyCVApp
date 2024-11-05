import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import CreateEmployer from '../screen/Employer/CreateEmployer';

const Footer = () => {
    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Hiển thị thêm việc làm</Text>
            </TouchableOpacity>

            <View style={styles.section}>
                <Text style={styles.sectionText}>quocduy2003a@gmail.com</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Người tìm việc</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle} onPress={()=> CreateEmployer}>Nhà tuyển dụng</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Giới thiệu</Text>
            </View>
        </View>
    );
}

export default Footer;

const styles = StyleSheet.create({
    footer: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
    },
    button: {
        width: '90%',
        paddingVertical: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        width: '100%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    
});
