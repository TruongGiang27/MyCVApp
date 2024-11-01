import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import Home from './src/screen/Home/Home';
import JobList from './src/screen/User/JobList';
import JobDetail from './src/screen/User/JobDetail';
import App from './App';

AppRegistry.registerComponent(appName, () => App);
