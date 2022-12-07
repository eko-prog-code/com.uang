import {StyleSheet, View} from 'react-native';
import React from 'react';
import AppLovinMAX from 'react-native-applovin-max';

import {applovin, colors} from '../../../utils';

export default function ApplovinBanner({width}) {
  if (AppLovinMAX.isInitialized() === false) return null;

  return (
    <View>
      <AppLovinMAX.AdView
        adUnitId={applovin.banner}
        adFormat={AppLovinMAX.AdFormat.BANNER}
        style={styles.banner(width)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: width => ({
    backgroundColor: 'transparent',
    width: width ?? '100%',
    height: AppLovinMAX.isTablet() ? 90 : 50,
    bottom: Platform.select({
      ios: 36,
      android: 0,
    }),
  }),
});
