/**
 * @format
 */

import { AppRegistry } from 'react-native';
import 'react-native-get-random-values';
import { name as appName } from './app.json';
import JobList from './src/screen/JobList';
AppRegistry.registerComponent(appName, () => JobList);
