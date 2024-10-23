/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import { name as appName } from './app.json';
import CreateEmployer from './src/screen/Employer/CreateEmployer';

AppRegistry.registerComponent(appName, () => CreateEmployer);
