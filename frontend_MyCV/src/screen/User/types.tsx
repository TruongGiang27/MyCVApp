import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    //Home
    Login: undefined;
    Home: undefined;
    //User
    CVCreate: undefined;
    CVManagerment: undefined;
    JobDetail: undefined;
    JobList: undefined;
    Message: undefined;
    //Profile
    Profile: undefined;
    //Employer
    CreateEmployer: undefined;
    ApplyManager: undefined;
    CVDetail: undefined;
    EmployerDetail: undefined;
    HomeEmployer: undefined;
    InforManager: undefined;
    JobPost: undefined;
    Service: undefined;
    //Admin
    InforEmloyer: undefined;
};

export type TPropsLoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;
