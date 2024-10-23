/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import { name as appName } from './app.json';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import JobPost from './src/screen/Employer/JobPost';
import inforEmployer from './src/screen/Employer/inforEmployer';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';


AppRegistry.registerComponent(appName, () => JobList);
