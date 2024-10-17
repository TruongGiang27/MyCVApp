/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import JobPost from './src/screen/Employer/JobPost';

AppRegistry.registerComponent(appName, () => JobPost);
