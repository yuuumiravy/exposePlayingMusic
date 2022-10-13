import React from 'react';
import {ScrollView, View} from 'react-native';

export default function DeviceScreen({navigation, route}) {
  const {id, name} = route.params;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}></View>
    </ScrollView>
  );
}
