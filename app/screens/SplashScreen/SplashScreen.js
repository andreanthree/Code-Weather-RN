import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {TextWidget} from '../../components/TextWidget';
import SplashStyle from './SplashStyle';
import lottie from '../../resources/lottie';
import AnimatedLottieView from 'lottie-react-native';
import {widthByScreen} from '../../utils/dimensions';
import {COLOR_WHITE} from '../../resources/theme';

const SplashScreen = ({}) => {
  return (
    <View style={SplashStyle.container}>
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
      <AnimatedLottieView
        source={lottie.weather}
        autoPlay
        loop
        style={{
          width: widthByScreen(90),
          height: widthByScreen(90),
        }}
      />
      <View style={SplashStyle.wrapperText}>
        <TextWidget
          label="Weather Apps"
          color={COLOR_WHITE}
          size="s2"
          weight="medium"
        />
        <TextWidget
          label="By Andrean Three"
          color={COLOR_WHITE}
          size="l1"
          weight="medium"
        />
      </View>
    </View>
  );
};
export default SplashScreen;
