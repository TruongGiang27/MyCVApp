import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/User/JobList'

AppRegistry.registerComponent(appName, () => Home);
