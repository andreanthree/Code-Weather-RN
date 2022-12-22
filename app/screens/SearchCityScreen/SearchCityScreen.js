import React, {useState} from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components/Header/Header';
import SearchCityStyle from './SearchCityStyle';
import {TextWidget} from '../../components/TextWidget';
import {ImageWidget} from '../../components/ImageWidget';
import {COLOR_BLACK, COLOR_GREY, COLOR_WHITE} from '../../resources/theme';
import {
  convertTemperature,
  formatDate,
  getWeatherIcon,
} from '../../utils/helper';
import {ListItem} from '../../components/ListItem/ListItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListItemStyle from '../../components/ListItem/ListItemStyle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getLocationData,
  updateConfigData,
} from '../../redux/actions/weatherAction';
import {UPDATE_DATA_CONFIG} from '../../redux/reducers/weatherReducer';

const SearchCityScreen = ({
  navigation,
  location,
  loadLocation,
  updateConfigData,
}) => {
  const {data, loading, error} = location;
  return (
    <View style={SearchCityStyle.container}>
      <Header
        titleCustom={
          <View style={SearchCityStyle.containerSearch}>
            <FontAwesome5 name="search" />
            <TextInput
              style={SearchCityStyle.inputSearch}
              onSubmitEditing={event => {
                loadLocation(event.nativeEvent.text);
              }}
            />
          </View>
        }
        customRight={
          <FontAwesome5.Button
            backgroundColor="transparent"
            name="search"
            color={COLOR_BLACK}
            onPress={() => {
              navigation.pop();
            }}
          />
        }
        showLeft={false}
      />

      <View style={SearchCityStyle.wrapperInfoForecast}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            const title = `${item.name}, ${item.state}, ${item.country}`;
            return (
              <ListItem
                key={index}
                title={title}
                // customStyleContainer={{
                //   paddingVertical: 8,
                // }}
                onPress={async () => {
                  await updateConfigData({
                    latitude: item.lat,
                    longitude: item.lon,
                    locationName: title,
                  });
                  navigation.navigate('SplashScreen');
                }}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

export const mapStateToProps = state => ({
  location: state.weather.locationData,
});

export const mapDispatchToProps = dispatch => ({
  loadLocation: bindActionCreators(getLocationData, dispatch),
  updateConfigData: bindActionCreators(updateConfigData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchCityScreen);
