import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DeviceScreen from '../screens/Devices/DeviceScreen';
import HomeScreen from '../screens/HomeScreen';
import {screenOptions} from './screenOptions';

const HomeStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'ホーム'}}
      />
      <HomeStack.Screen
        name="Device"
        component={DeviceScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </HomeStack.Navigator>
  );
};
const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator
      initialRouteName="Settings"
      screenOptions={screenOptions}>
      <SettingsStack.Screen
        name="Settings"
        component={HomeScreen}
        options={{title: '設定'}}
      />
    </SettingsStack.Navigator>
  );
};

export {HomeStackScreen, SettingsStackScreen};
