/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import { name as appName } from './app.json';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import Home from './src/screen/Home/Home';
import App from './App';
import JobPost from './src/screen/Employer/JobPost';
import InforEmployer from './src/screen/Employer/InforEmployer';
AppRegistry.registerComponent(appName, () => CreateEmployer);
