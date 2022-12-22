import React, {useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {TextWidget} from '../../components/TextWidget';
import SplashStyle from './SplashStyle';
import lottie from '../../resources/lottie';
import AnimatedLottieView from 'lottie-react-native';
import {widthByScreen} from '../../utils/dimensions';
import {COLOR_WHITE} from '../../resources/theme';
import {getDailyData, getForeCastData} from '../../redux/actions/weatherAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const SplashScreen = ({loadDaily, loadForecast, navigation}) => {
  useEffect(() => {
    loadAllData();
  }, []);
  const loadAllData = async () => {
    await loadDaily();
    await loadForecast();
    navigation.replace('HomeScreen');
  };
  return (
    <View style={SplashStyle.container}>
      <StatusBar translucent={true} backgroundColor="rgba(0,0,0,0)" />
      <AnimatedLottieView
        source={lottie.weather}
        autoPlay
        loop
        style={{
          width: widthByScreen(90),
          height: widthByScreen(60),
        }}
      />
      <TextWidget
        label="Loading Data . . ."
        color={COLOR_WHITE}
        size="s3"
        weight="medium"
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

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => ({
  loadDaily: bindActionCreators(getDailyData, dispatch),
  loadForecast: bindActionCreators(getForeCastData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
