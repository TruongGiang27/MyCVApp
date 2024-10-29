/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/JobList';
import JobDetail from './src/screen/JobDetail';
import App from './App';
import HomeEmployer from './src/screen/Employer/HomeEmployer';

AppRegistry.registerComponent(appName, () => HomeEmployer);
