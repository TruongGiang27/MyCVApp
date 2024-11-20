export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    CreateEmployer: undefined;
    InforEmployer: undefined;
    HomeEmployer: undefined;
    Profile: undefined;
    JobPost: undefined;
    JobList: undefined;
    JobDetail:{ jobId: string };
    CvDetail: undefined;
    ApplyManager: undefined;
    InforManager: undefined;
    EmployerDetail: { jobId: string };
};
export default RootStackParamList;