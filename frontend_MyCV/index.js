/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import JobPost from './src/screen/Employer/JobPost';
import inforEmployer from './src/screen/Employer/inforEmployer';

AppRegistry.registerComponent(appName, () => inforEmployer);
