/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';
import CreateEmployer from './src/screen/Employer/CreateEmployer';
import JobPost from './src/screen/Employer/JobPost';
import Navbar from './src/components/Navbar';
import Home from './src/screen/Home/Home';

// Register the app with TypeScript support
AppRegistry.registerComponent(appName, () => Home);
