import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
// import TabNavigator from './navigations/TabNavigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigator from './navigations/TabNavigator';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <PaperProvider> */}
      <TabNavigator />
      {/* </PaperProvider> */}
    </NavigationContainer>
  );
}
