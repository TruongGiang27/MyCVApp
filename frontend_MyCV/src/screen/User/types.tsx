import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenName from '../../constants/ScreenName';

export type RootStackParamList = {
    //Home
    Login: undefined;
    Home: undefined;
    //User
    CVManagerment: undefined;
    JobDetail: { jobId: string };
    CVCreate: { startStep: number; jobId: string };
    JobList: undefined;
    Message: undefined;
    Notification: undefined;
    //Profile
    Profile: undefined;
    //Employer
    CreateEmployer: undefined;
    ApplyManager: { jobId: string };
    CVDetail: undefined;
    EmployerDetail: { jobId: string };
    HomeEmployer: undefined;
    InforManager: undefined;
    JobPost: undefined;
    Service: undefined;
    SendSMS: undefined;
    //Admin

    //Component
    Navbar: undefined;
};
export type Props = NativeStackScreenProps<RootStackParamList, ScreenName>;

export type TPropsLoginScreen = NativeStackScreenProps<RootStackParamList, 'Login'>;
