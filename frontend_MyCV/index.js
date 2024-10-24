/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import { name as appName } from './app.json';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';
import MessageScreen from './src/screen/Message';

AppRegistry.registerComponent(appName, () => JobList);
