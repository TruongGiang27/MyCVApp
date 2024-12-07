
export type RootStackParamList = {
    Home:{id: string};
    Login: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: { userId: string };
    Profile: { userEmail: string };
    JobPost: undefined;
    JobList1: { location: string, query: string };
    SearchSceen: { searchType: string };
    CVCreate: undefined;
    InforEmployers: undefined;
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