
export type RootStackParamList = {
    Home:{userId: string};
    Login: undefined;
    CreateEmployer: undefined;
    HomeEmployer: {userId: string};
    Profile: {userId:string, userEmail: string, jobId: string, jobName: string};
    JobPost: undefined;
    JobList: { location?: string, query: string };
    SearchScreen: { searchType: string };
    CVCreate: undefined;
    MessageScreen: undefined;
    CvDetail: undefined;
    ApplyManager: { jobId: string };
    InforManager: undefined;
    EmployerDetail: { jobId: string };
    CVManagerment: undefined;
    JobDetail: { jobId: string, jobName: string, userId: string, userEmail: string };
    ManageCVsApplied: undefined;
    FavoriteJob: undefined;
    CVDetail: {cvId: string};
    SendSMS: undefined;
};
export default RootStackParamList;