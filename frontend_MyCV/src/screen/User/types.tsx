import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
};

export type TPropsLoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;
