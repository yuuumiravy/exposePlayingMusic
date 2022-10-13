/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, useEffect, useState } from 'react';
import type { Node } from 'react';
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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import BleManager from 'react-native-ble-manager';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({ children, title }): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

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
    BleManager.start({ showAlert: false })
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
        { id: args.id, name: args.name || 'undefinded' },
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
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.js</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="Bluetooth">Status: {status}</Section>
          <Section title="Bluetooth Devices">
            {/* {
              <FlatList
                data={devices}
                renderItem={({ item }) => {
                  return (
                    <Text key={item.id}>
                      id: {item.id}
                      {item.name}
                    </Text>
                  );
                }}
              />
            } */}
            {devices.map(device => (
              <View key={device.id}>
                <Text>{device.name}</Text>
              </View>
            ))}
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
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
