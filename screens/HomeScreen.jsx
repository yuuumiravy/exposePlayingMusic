import React, {useEffect, useState} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  ScrollView,
  View,
} from 'react-native';

import BleManager from 'react-native-ble-manager';
import {Button} from 'react-native-paper';

export default function HomeScreen({navigation}) {
  const [status, setStatus] = useState();
  const [devices, setDevices] = useState([]);
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  const scan = () => {
    BleManager.scan([], 5, false)
      .then(() => {
        console.log('Scan started');
        setDevices([]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager initialized');

        bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', args => {
          console.log('BleManagerDiscoverPeripheral');
          console.log(args);
          setDevices(currentDevices => [
            ...currentDevices,
            {
              id: args.id,
              name: args.name,
              rssi: args.rssi,
              advertising: args.advertising,
            },
          ]);
        });

        bleManagerEmitter.addListener('BleManagerDidUpdateState', args => {
          setStatus(args.state);
        });
      })
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      // イベントリスナーが登録された後にスキャンする
      BleManager.checkState();
      scan();
    }, 50);
  }, []);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Button onPress={scan}>更新する</Button>
      {devices.map(device => (
        <View key={device.id}>
          <Button
            onPress={() =>
              navigation.navigate('Device', {
                id: device.id,
                name: device.name,
                rssi: device.rssi,
                advertising: device.advertising,
              })
            }>
            {device.name || device.id}
          </Button>
        </View>
      ))}
    </ScrollView>
  );
}
