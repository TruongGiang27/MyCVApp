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
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SendSMS from 'react-native-sms';
import Icon from 'react-native-vector-icons/Ionicons';
type RouteParams = {
    phone: string;
    email: string; // Add name parameter
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
        if (route.params.email) {
            setRecipientName(route.params.email);
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
                successTypes: ['sent', 'queued'],
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
                <View style={styles.headerContent}>
                    <Text style={styles.recipientName}>{recipientName}</Text>
                </View>
            </View>
            <Text style={styles.phoneLabel}>Số điện thoại:</Text>
            <Text style={styles.recipient}>{recipient}</Text>
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
                <Text style={styles.buttonText} onPress={sendMessage}>Send SMS</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    headerContent: {
        flex: 1,
        alignItems: 'center',
    },
    phoneLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#011F82',
        marginBottom: 5,
    },
    recipient: {
        fontSize: 16,
        color: '#011F82',
        marginBottom: 20,
    },
    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    messageInput: {
        height: 150,
        textAlignVertical: 'top',
    },
    picker: {
        width: '90%',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonContainer: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    recipientName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#011F82',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
});

export default SendSMSComponent;