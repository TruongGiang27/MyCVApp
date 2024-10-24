/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import HomeEmployer from './src/screen/Employer/HomeEmployer';
import InfoEmployer from './src/screen/Admin/InforEmployers';
AppRegistry.registerComponent(appName, () => App);
