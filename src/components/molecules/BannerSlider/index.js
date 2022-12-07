import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {Dimensions, Text, StyleSheet, View} from 'react-native';
//import { Banner, Banner2 } from "../../../assets";
import {SliderBox} from 'react-native-image-slider-box';
//import { responsiveHeight, responsiveWidth, colors } from "../../../utils";

const BannerSlider = ({data, links}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SliderBox
        onCurrentImagePressed={index => {
          if (links[index]) {
            navigation.navigate('WebviewPage', {link: links[index]});
          }
        }}
        images={data}
        autoplay
        circleLoop
        //sliderBoxHeight={Height(172)}
        ImageComponentStyle={styles.slider}
        dotStyle={styles.dotStyle}
        //imageLoadingColor={colors.primary}
      />
    </View>
  );
};

export default BannerSlider;

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
  },
  slider: {
    height: Dimensions.get('screen').height / 5,
    width: Dimensions.get('screen').width /1.08,
    marginRight: 27,
    borderRadius: 8,
    //width: responsiveWidth(420),
  },
  dotStyle: {
    width: 10,
    height: 5,
    borderRadius: 5,
  },
});

