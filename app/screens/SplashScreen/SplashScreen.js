import React, {useEffect, useState} from 'react';
import {
  BackHandler,
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextWidget} from '../../components/TextWidget';
import SplashStyle from './SplashStyle';
import lottie from '../../resources/lottie';
import AnimatedLottieView from 'lottie-react-native';
import {widthByScreen} from '../../utils/dimensions';
import {COLOR_WHITE} from '../../resources/theme';
import {
  getDailyData,
  getForeCastData,
  updateConfigData,
} from '../../redux/actions/weatherAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import Modal from 'react-native-modal';
import {Button} from '../../components/Button/Button';
const SplashScreen = ({
  loadDaily,
  loadForecast,
  navigation,
  updateConfigData,
}) => {
  const [modalRequestLocation, setmodalRequestLocation] = useState(false);
  useEffect(() => {
    checkPermissionLocation();
  }, []);
  const loadAllData = async () => {
    await loadDaily();
    await loadForecast();
    navigation.replace('HomeScreen');
  };

  const checkPermissionLocation = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            onGetLocationUser();
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            Linking.openSettings();
            break;
          default:
            setmodalRequestLocation(true);
            break;
        }
      })
      .catch(error => {
        requestPermissionLocation();
      });
  };
  const requestPermissionLocation = async () => {
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result == RESULTS.GRANTED) {
        onGetLocationUser();
      } else if (result == RESULTS.BLOCKED) {
        Linking.openSettings();
      } else {
        setmodalRequestLocation(true);
      }
    });
  };
  const onGetLocationUser = () => {
    Geolocation.getCurrentPosition(async info => {
      if (info.coords) {
        await updateConfigData(info.coords);
        loadAllData();
      } else {
        onGetLocationUser();
      }
    });
  };
  const renderModalRequestLocation = () => (
    <Modal
      isVisible={modalRequestLocation}
      useNativeDriver
      animationIn={'fadeInDown'}
      style={{margin: 0}}>
      <View style={SplashStyle.containerModal}>
        <TextWidget label="Izin Lokasi" size="s2" weight="bold" />
        <TextWidget
          label="Untuk memberikan pengalaman yang lebih baik, izinkan kami untuk mengakses lokasimu"
          size="b2"
          weight="regular"
          customStyle={SplashStyle.descriptionModal}
        />
        <Button
          title="Berikan Izin"
          onPress={() => {
            setmodalRequestLocation(false);
            requestPermissionLocation();
          }}
        />
        <TouchableOpacity
          style={SplashStyle.exitText}
          onPress={() => {
            BackHandler.exitApp();
          }}>
          <TextWidget label="Keluar" size="b2" weight="bold" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
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
      {renderModalRequestLocation()}
    </View>
  );
};

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => ({
  loadDaily: bindActionCreators(getDailyData, dispatch),
  loadForecast: bindActionCreators(getForeCastData, dispatch),
  updateConfigData: bindActionCreators(updateConfigData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
