// SendSMS.tsx
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Button,
    StyleSheet,
    Alert,
    Linking,
    Platform,
    TextInput,
    PermissionsAndroid,
    BackHandler,
    Text,
    TouchableOpacity
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SendSMS from 'react-native-sms';
import Icon from 'react-native-vector-icons/Ionicons';
type RouteParams = {
    phone: string;
    fullName: string; // Add name parameter
};
const SendSMSComponent = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const [hasPermission, setHasPermission] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [recipient, setRecipient] = useState('');
    const [recipientName, setRecipientName] = useState(''); // Add state for recipient name
    const [selectedTime, setSelectedTime] = useState('08:00 - 09:00'); // Default time
    const [message, setMessage] = useState('Chúc mừng bạn đã ứng tuyển');  // Default message

    useEffect(() => {
        if (route.params.phone) {
            setRecipient(route.params.phone);
        }
        if (route.params.fullName) {
            setRecipientName(route.params.fullName);
        }
    }, [route.params]);

    // Time slots
    const timeSlots = [
        '08:00 - 09:00',
        '09:00 - 10:00',
        '10:00 - 11:00',
        '11:00 - 12:00',
        '13:00 - 14:00',
        '14:00 - 15:00',
        '15:00 - 16:00',
        '16:00 - 17:00',
    ];

    const BackHandler = () => {
        navigation.goBack();
    };

    const requestSMSPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.SEND_SMS,
                    {
                        title: 'SMS Permission',
                        message: 'This app needs permission to send SMS.',
                        buttonNeutral: 'Later',
                        buttonNegative: 'Cancel',
                        buttonPositive: 'Allow',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setHasPermission(true);
                } else {
                    handlePermissionDenied();
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            setHasPermission(true);
        }
    };

    const handlePermissionDenied = () => {
        Alert.alert(
            'Permission Denied',
            'The app needs SMS permission to send messages. You can enable it in settings.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Open Settings', onPress: () => Linking.openSettings() },
            ]
        );
    };

    const sendMessage = () => {
        if (!hasPermission) {
            Alert.alert('Error', 'You haven\'t granted SMS permission.');
            return;
        }

        if (isSending) {
            Alert.alert('Sending', 'Please wait until the message is sent.');
            return;
        }

        if (!recipient || !message) {
            Alert.alert('Error', 'Please enter a phone number and message.');
            return;
        }

        setIsSending(true);

        // Combine message with time slot
        const timeMessage = selectedTime ? `\nContact time: ${selectedTime}` : '';
        const fullMessage = `${message}${timeMessage}`;

        SendSMS.send(
            {
                body: fullMessage,
                recipients: [recipient],
                // successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true,
            },
            (completed, cancelled, error) => {
                setIsSending(false);
                if (completed) {
                    Alert.alert('Success', 'Message has been sent.');
                } else if (cancelled) {
                    Alert.alert('Cancelled', 'The user cancelled the sending.');
                } else if (error) {
                    Alert.alert('Error', 'Could not send the message.');
                }
            }
        );
    };

    useEffect(() => {
        requestSMSPermission();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} style={styles.backIcon} />
                <Text style={styles.headerText}>Send SMS</Text>
            </View>
            <View style={styles.recipientInfo}>
                <Text style={styles.recipientText}>Recipient: {recipientName}</Text>
                <Text style={styles.recipientText}>Phone: {recipient}</Text>
            </View>



            {/* Phone Number Input */}
            {/* <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={recipient}
                onChangeText={setRecipient}
            /> */}
            <TextInput
                style={[styles.input, styles.messageInput]}
                defaultValue='Chúc mừng bạn đã trúng tuyển thành công, vui lòng hãy chú ý thời gian để phỏng vấn'
                placeholder="Enter message"
                multiline
                value={message}
                onChangeText={setMessage}
            />

            {/* Time Slot Picker */}
            <Picker
                selectedValue={selectedTime}
                onValueChange={(itemValue) => setSelectedTime(itemValue)}
                style={styles.picker}
            >
                {timeSlots.map((slot) => (
                    <Picker.Item key={slot} label={slot} value={slot} />
                ))}
            </Picker>

            {/* Send Button */}
            <View style={styles.buttonContainer}>
                {/* <Button title="Send SMS" onPress={sendMessage} disabled={isSending} /> */}
                <TouchableOpacity onPress={sendMessage} disabled={isSending}>
                    <Text style={styles.buttonText}>Send SMS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#011F82',
        marginLeft: 10,
    },
    backIcon: {
        color: '#011F82',
    },
    recipientInfo: {
        width: '90%',
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        marginBottom: 20,
    },

    recipientText: {
        fontSize: 18, // Tăng kích thước
        color: '#011F82', // Màu xanh cùng tông
        fontWeight: 'bold', // Đậm để nổi bật
        textAlign: 'center',
        marginBottom: 5,
    },

    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
        color: '#374151',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    messageInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    picker: {
        width: '90%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        fontSize: 16,
        color: '#374151',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonContainer: {
        width: '90%',
        backgroundColor: '#011F82',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});




export default SendSMSComponent;