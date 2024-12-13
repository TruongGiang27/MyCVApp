
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  CreateEmployer: undefined;
  HomeEmployer: { userId: string };
  Profile: { userId: string, userEmail: string, jobId: string, jobName: string, updated: boolean };
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
  CVDetail: { cvId: string };
  SendSMS: { phone: string };
  EditCV: { cvId: string };
};
export default RootStackParamList;