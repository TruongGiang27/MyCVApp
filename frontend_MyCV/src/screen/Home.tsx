import { StyleSheet, Text, View, Image } from "react-native"

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo.png')}/>
        </View>
    </View>
    );
};
export default Home;

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
    },

    logo: {
        width:170,
        height:50,
    },
});