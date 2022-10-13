import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/SettingsScreen';
import {screenOptions} from './screenOptions';
import {HomeStackScreen} from './StackNavigator';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="ホーム"
        component={HomeStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="設定" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
