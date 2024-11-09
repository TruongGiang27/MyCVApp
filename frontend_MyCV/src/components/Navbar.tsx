import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

const Navbar = () => (
  <View style={styles.navbar}>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="home" type="font-awesome" color="#007AFF" />
      <Text style={styles.navText}>Trang chủ</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="bookmark" type="font-awesome" color="#666" />
      <Text style={styles.navText}>Việc làm của tôi</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="envelope" type="font-awesome" color="#666" />
      <Text style={styles.navText}>Tin nhắn</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="post" type="font-awesome" color="#666" />
      <Text style={styles.navText}>Đăng bài</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navItem}>
      <Icon name="user" type="font-awesome" color="#666" />
      <Text style={styles.navText}>Hồ sơ</Text>
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
