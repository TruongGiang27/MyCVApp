/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';
import MessageScreen from './src/screen/Message';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import InforEmployer from './src/screen/Employer/inforEmployer';
import Login from './src/screen/Login';

AppRegistry.registerComponent(appName, () => JobList);
