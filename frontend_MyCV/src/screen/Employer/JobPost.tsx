// import { View } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Navbar from '../../components/Navbar';
const JobPost = () => {
    return (
        <View style={styles.container}>
            <Navbar />

            <View style={styles.content}>
                <Text style={styles.title}>Tạo bài đăng tuyển dụng</Text>

            </View>
        </View>
    );
}
export default JobPost;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    content: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },

    title: {
        marginBottom: 10,
        lineHeight: 50,
        marginTop: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: '#011F82',
        textAlign: 'center',
    },


});
