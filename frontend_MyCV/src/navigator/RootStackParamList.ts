
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
    CVManagerment:{userId: string};
    JobDetail: { jobId: string, jobName: string, userId: string, userEmail: string };
    ManageCVsApplied: { cvId: string, disableButtons: boolean, jobId: string, userId: string };
    FavoriteJob: undefined;
    CVDetail: {cvId: string, jobId: string};
    SendSMS: {phone: string};
    EditCV: { cvId: string };
    InfoEmployer: { userId: string, updated: boolean };
    EditInfoEmployer: { userId: string};
    CVInfor: { cvId: string };
};
export default RootStackParamList;