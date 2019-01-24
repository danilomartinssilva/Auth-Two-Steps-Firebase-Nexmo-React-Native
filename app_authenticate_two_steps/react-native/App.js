/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SignUpForm from './components/SignUpForm';
import SigInForm from './components/SignInForm';

import  * as firebase  from 'firebase';

export default class App extends Component {

  componentDidMount(){
    

      const config = {
        apiKey: "xxxxxxxx",
        authDomain: "xxxxx",
        databaseURL: "xxxxx",
        projectId: "xxx",
        storageBucket: "xxx",
        messagingSenderId: "xxxx"
      };
      firebase.initializeApp(config);
 
  }

  render() {
    return (
      <View style={styles.container}>
        <SignUpForm/>
        <SigInForm/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

 
});
