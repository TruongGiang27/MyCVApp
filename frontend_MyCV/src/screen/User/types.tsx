import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: undefined;
    JobPost: undefined;
    JobList: undefined;
    CvDetail: undefined;
    ApplyManager: undefined;
    JobDetail: undefined;
    Service: undefined;
    EditCv: undefined;
};

export type TPropsLoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;
