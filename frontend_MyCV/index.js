/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/JobList';
import JobPost from './src/screen/Employer/JobPost';
import App from './App';

AppRegistry.registerComponent(appName, () =>JobList);
