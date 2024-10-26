/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import InforEmployer from './src/screen/Employer/InforEmployer';
import Login from './src/screen/Login';

AppRegistry.registerComponent(appName, () => App);
