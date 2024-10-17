// import { View } from 'native-base';
import * as React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const JobPost = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <View style={styles.navbarleft}>
                    <FontAwesome5 name={"arrow-left"} size={24} color="black" />
                    <FontAwesome5 name={"home"} size={24} color="black" />
                </View>
                <View style={styles.navbarright}>
                    <FontAwesome5 name={"envelope"} size={24} color="black" />
                    <FontAwesome5 name={"bell"} size={24} color="black" />
                    <FontAwesome5 name={"list"} size={24} color="black" />
                </View>

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

    navbar: {
        width: '100%',
        height: 50,
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },

    navbarleft: {
        display: 'flex',
        flexDirection: 'row',
    },

    navbarright: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

});
