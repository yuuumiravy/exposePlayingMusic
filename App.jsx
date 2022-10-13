/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment, useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager';
import {Appbar} from 'react-native-paper';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [status, setStatus] = useState();
  const [devices, setDevices] = useState([]);
  const BleManagerModule = NativeModules.BleManager;
  const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

  // BleManagerを起動
  useEffect(() => {
    BleManager.start({showAlert: false})
      .then(() => {
        console.log('BleManager initialized');
        BleManager.checkState();
      })
      .catch(error => {
        console.log(error);
      });
    setDevices([]);
    BleManager.scan([], 1, false).then(results => {
      setDevices([]);
      console.log('Scan started');
    });

    bleManagerEmitter.addListener('BleManagerDidUpdateState', args => {
      setStatus(args.state);
    });

    bleManagerEmitter.addListener('BleManagerStopScan', () => {
      // Scanning is stopped
      console.log('BleManagerStopScan');
    });

    bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', args => {
      console.log('BleManagerDiscoverPeripheral');
      setDevices(currentDevices => [
        ...currentDevices,
        {id: args.id, name: args.name || 'undefinded'},
      ]);
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Appbar>
          <Appbar.BackAction onPress={() => {}} />
          <Appbar.Content title="Bluetoothデバイスを選択" />
        </Appbar> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* {
            <FlatList
              data={devices}
              renderItem={({item}) => {
                return (
                  <Text key={item.id}>
                    id: {item.id}
                    {item.name}
                  </Text>
                );
              }}
            />
          } */}
          {/* {devices.map(device => (
            <View key={device.id}>
              <Text>{device.name}</Text>
            </View>
          ))} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
