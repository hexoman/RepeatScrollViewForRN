/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image
} from 'react-native';

import RepeatScrollView from './RepeatScrollView.js';
var screenWidth = Dimensions.get('window').width

var picArr = [require('./src/1.png'),require("./src/2.png"),require("./src/3.png"),require("./src/4.png"),require("./src/5.png")];
const App: () => React$Node = () => {

  return (
    <>
      <View>
           <View style={styles.back}>
              <RepeatScrollView
                data={ picArr }
                renderItem={({ item }) =>  
                  <Image source={item} style={styles.bannerItem}/>}
              />
            </View>
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  back: {
    height: 250,
    width: screenWidth,
  },

  bannerItem: {
    height: 250,
    width: screenWidth,
    alignItems: 'center',
  }
  
});

export default App;
