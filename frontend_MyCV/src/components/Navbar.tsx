import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface NavbarProps {
  onProfilePress: () => void;
  onMessagesPress: () => void;
  onHomePress: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onProfilePress, onMessagesPress, onHomePress }) => (
  <View style={styles.navbar}>
    <TouchableOpacity style={styles.navItem} onPress={onHomePress}>
      <Icon name="home-outline" size={25} color="#000" />
      <Text style={styles.navText}>Trang chủ</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="bookmark-outline" size={25} color="#000" />
      <Text style={styles.navText}>Việc làm của tôi</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={onMessagesPress}>
      <Icon name="chatbubble-outline" size={25} color="#000" />
      <Text style={styles.navText}>Tin nhắn</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem} onPress={onProfilePress}>
      <Icon name="person-outline" size={25} color="#007AFF" />
      <Text style={[styles.navText, { color: '#007AFF' }]}>Hồ sơ</Text>
    </TouchableOpacity>
  </View>
);

export default Navbar;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up full screen height
    justifyContent: 'flex-end', // Pushes the navbar to the bottom
  },
  navbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    position: 'relative',
    bottom: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
});
