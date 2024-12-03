// SendSMS.tsx
import { useNavigation, useRoute ,RouteProp} from '@react-navigation/native';
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
};
const SendSMSComponent = () => {
    const navigation = useNavigation();
    const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
    const [hasPermission, setHasPermission] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [recipient, setRecipient] = useState('');
    const [selectedTime, setSelectedTime] = useState('08:00 - 09:00'); // Default time
    const [message, setMessage] = useState('Chúc mừng bạn đã ứng tuyển');  // Default message

    useEffect(() => {
        if (route.params && route.params.phone) {
            setRecipient(route.params.phone);
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
            <Icon name="arrow-back" size={30} color="#011F82" onPress={BackHandler} style={styles.backIcon} />

            {/* Phone Number Input */}
            <TextInput
                style={styles.input}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
                value={recipient}
                onChangeText={setRecipient}
            />
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
                <Button title="Send SMS" onPress={sendMessage} disabled={isSending} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',  // Align content at the top
        alignItems: 'center',
        padding: 20,  // Increased padding for better spacing
        backgroundColor: '#f9f9f9', // Light background color
    },
    backIcon: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    input: {
        width: '90%',  // Make input fields narrower
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    messageInput: {
        height: 150,  // Increased height for better visibility
        textAlignVertical: 'top',
    },
    picker: {
        width: '90%',  // Match picker width with input fields
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        marginTop: 20,
        width: '90%',  // Ensure button width matches input fields
        backgroundColor: '#4CAF50', // Green button
        borderRadius: 8,
    },
});

export default SendSMSComponent;