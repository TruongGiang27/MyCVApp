
export type RootStackParamList = {
    Home:{userId: string};
    Login: undefined;
    CreateEmployer: undefined;
    HomeEmployer: {userId: string};
    Profile: {userId:string, userEmail: string, jobId: string, jobName: string,  updated: boolean};
    JobPost: undefined;
    JobList: { location?: string, query: string };
    SearchScreen: { searchType: string };
    CVCreate: undefined;
    MessageScreen: undefined;
    CvDetail: undefined;
    ApplyManager: { jobId: string };
    InforManager: {userId: string};
    EmployerDetail: { jobId: string };
    CVManagerment: undefined;
    JobDetail: { jobId: string, jobName: string, userId: string, userEmail: string };
    ManageCVsApplied: undefined;
    FavoriteJob: undefined;
    CVDetail: {cvId: string};
    SendSMS: {phone: string};
    EditCV: { cvId: string };
    InfoEmployer: { userId: string, updated: boolean };
    EditInfoEmployer: { userId: string};
};
export default RootStackParamList;