import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screen/Home/Login';
import Home from '../../screen/Home/Home';

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="SignIn" component={Login} />
            <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
    );
}

export default AuthNavigator;