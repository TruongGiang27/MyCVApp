
export type RootStackParamList = {
    Home:{id: string};
    Login: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: undefined;
    Profile: undefined;
    JobPost: undefined;
    JobList: undefined;
    CVCreate: undefined;
    InforEmployers: undefined;
    MessageScreen: undefined;
    CvDetail: undefined;
    ApplyManager: {jobId: string};
    InforManager: undefined;
    EmployerDetail: { jobId: string };
    CVManagerment: undefined;
    JobDetail: { jobId: string, userId: string };
    ManageCVsApplied: undefined;
    FavoriteJob: undefined;
    CVDetail: { cvId: string };
};
export default RootStackParamList;