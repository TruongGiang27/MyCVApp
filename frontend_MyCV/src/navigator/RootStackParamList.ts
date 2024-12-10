
export type RootStackParamList = {
    Home:undefined;
    Login: undefined;
    CreateEmployer: undefined;
    HomeEmployer:undefined;
    Profile: {userId:string, userEmail: string };
    JobPost: undefined;
    JobList1: { location: string, query: string };
    SearchSceen: { searchType: string };
    CVCreate: undefined;
    MessageScreen: undefined;
    CvDetail: undefined;
    ApplyManager: { jobId: string };
    InforManager: undefined;
    EmployerDetail: { jobId: string };
    CVManagerment: undefined;
    JobDetail: { jobId: string, userId: string };
    ManageCVsApplied: undefined;
    FavoriteJob: undefined;
    CVDetail: {cvId: string};
    SendSMS: undefined;
};
export default RootStackParamList;