import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert, Linking, Platform } from 'react-native';
import SendSMS from 'react-native-sms';
import { PermissionsAndroid } from 'react-native';

const SendSMSComponent = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [isSending, setIsSending] = useState(false);  // Thêm flag kiểm tra trạng thái gửi tin nhắn

    // Hàm yêu cầu quyền gửi SMS trên Android
    const requestSMSPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    {
                        title: "SMS Permission",
                        message: "Ứng dụng cần quyền gửi tin nhắn SMS.",
                        buttonNeutral: "Sau",
                        buttonNegative: "Hủy",
                        buttonPositive: "Cho phép",
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasPermission(true);
                    console.log("Quyền gửi SMS đã được cấp!");
                } else {
                    handlePermissionDenied();
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            setHasPermission(true);  // Giả định quyền đã được cấp trên iOS
        }
    };

    const handlePermissionDenied = () => {
        Alert.alert(
            "Quyền bị từ chối",
            "Ứng dụng cần quyền gửi SMS để có thể gửi tin nhắn. Bạn có thể cấp quyền trong cài đặt.",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Mở cài đặt",
                    onPress: () => Linking.openSettings(),
                }
            ]
        );
    };

    // Hàm gửi tin nhắn
    const sendMessage = () => {
        if (!hasPermission) {
            Alert.alert("Lỗi", "Bạn chưa cấp quyền gửi SMS.");
            return;
        }

        if (isSending) {
            Alert.alert('Đang gửi', 'Vui lòng đợi cho đến khi tin nhắn được gửi.');
            return;  // Tránh gửi tin nhắn khi đang gửi
        }

        setIsSending(true);  // Đánh dấu là đang gửi tin nhắn

        SendSMS.send(
            {
                body: 'Hello! Đây là tin nhắn thử nghiệm.',
                recipients: ['0356382367'],
                successTypes: ['sent', 'queued']
            },
            (completed, cancelled, error) => {
                setIsSending(false);  // Đánh dấu đã hoàn thành gửi tin nhắn

                if (completed) {
                    Alert.alert('Thành công', 'Tin nhắn đã được gửi.');
                } else if (cancelled) {
                    Alert.alert('Đã hủy', 'Người dùng đã hủy gửi tin nhắn.');
                } else if (error) {
                    Alert.alert('Lỗi', 'Không thể gửi tin nhắn.');
                }
            }
        );
    };

    useEffect(() => {
        requestSMSPermission();
    }, []);

    return (
        <View style={styles.container}>
            <Button title="Gửi SMS" onPress={sendMessage} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SendSMSComponent;
