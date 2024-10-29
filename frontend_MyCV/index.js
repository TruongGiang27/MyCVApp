/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/JobList';
import ApplyManager from './src/screen/Employer/ApplyManager';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import InforManager from './src/screen/Employer/InforManager';
import HomeEmployer from './src/screen/Employer/HomeEmployer';

AppRegistry.registerComponent(appName, () => HomeEmployer);
