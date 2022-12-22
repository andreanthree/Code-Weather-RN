import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components/Header/Header';
import HomeStyle from './HomeStyle';
import {TextWidget} from '../../components/TextWidget';
import {ImageWidget} from '../../components/ImageWidget';
import {
  COLOR_BLACK,
  COLOR_FONT_PRIMARY,
  COLOR_GREY,
  COLOR_WHITE,
} from '../../resources/theme';
import {
  convertTemperature,
  formatDate,
  getWeatherIcon,
} from '../../utils/helper';
import {ListItem} from '../../components/ListItem/ListItem';
import {widthByScreen} from '../../utils/dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ListItemStyle from '../../components/ListItem/ListItemStyle';
import {connect} from 'react-redux';

const HomeScreen = ({daily, forecast, config, navigation}) => {
  const [indexselectedWeather, setindexselectedWeather] = useState(-1);
  const currentTemperature = config.temperature;
  const {data, loading: loadingDaily} = daily;
  let weatherInfo = loadingDaily ? {} : data.weather[0];

  const renderInfoWind = (title, value) => (
    <TextWidget
      label={`${title}: ${value}`}
      weight="bold"
      size="l1"
      customStyle={HomeStyle.textInfoWind}
    />
  );
  const formatForecastData = () => {
    let data = [];
    forecast.data.forEach(element => {
      let dtConvert = new Date(element.dt * 1000);
      let currentDate = formatDate(dtConvert, 'ddd MMM DD');
      let findIndex = data.findIndex(el => el['dateFormat'] == currentDate);
      if (findIndex == -1) {
        data.push({
          ...element,
          date: dtConvert,
          dateFormat: currentDate,
          child: [element],
        });
      } else {
        data[findIndex]['child'].push(element);
      }
    });
    return data;
  };
  const HeaderComponent = () => {
    return (
      <View
        style={[
          HomeStyle.containerContent,
          {paddingBottom: indexselectedWeather != -1 ? 84 : 0},
        ]}>
        <View style={HomeStyle.infoHeader}>
          <View style={HomeStyle.row}>
            <ImageWidget
              source={{
                uri: getWeatherIcon(weatherInfo.icon),
              }}
              width={48}
              height={48}
            />
            <View>
              <TextWidget
                label={`${weatherInfo.main}`}
                weight="medium"
                size="b2"
              />
              <TextWidget
                label={weatherInfo.description}
                weight="light"
                size="l1"
              />
            </View>
          </View>
          <TextWidget
            label={`${convertTemperature(
              data?.main?.temp,
              currentTemperature,
            )}°${currentTemperature}`}
            weight="light"
            size="t1"
            color={COLOR_BLACK}
            customStyle={{...HomeStyle.degreeInfo}}
          />
          <TextWidget
            label={`Feels like ${convertTemperature(
              data.main.feels_like,
              currentTemperature,
            )} °${currentTemperature}`}
            weight="light"
            size="l1"
          />
        </View>

        <TextWidget
          label={`No precipication within an hour`}
          weight="bold"
          size="b2"
        />
        <View style={HomeStyle.wrapperChart}></View>
        <View style={HomeStyle.wrapperInfoWind}>
          {renderInfoWind('Wind', `${data.wind.speed}m/s`)}
          {renderInfoWind('Himidity', `${data.main.humidity} %`)}
          {renderInfoWind('UV Index', '-')}
          {renderInfoWind('Pressure', `${data.main.pressure}inHg`)}
          {renderInfoWind(
            'Visibility',
            `${Number(data.visibility / 1000).toFixed(2)}km`,
          )}
          {renderInfoWind('Dew point', `-`)}
        </View>
        <FlatList
          data={forecast.data}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            let isFirstHour = false;
            try {
              if (
                parseInt(`${formatDate(new Date(item.dt * 1000), 'HH')}`) < 2
              ) {
                isFirstHour = true;
              }
            } catch (error) {}
            return (
              <View style={HomeStyle.wrapperWeatherInfoIcon}>
                <TextWidget
                  label={formatDate(
                    new Date(item.dt * 1000),
                    isFirstHour ? 'MMM DD' : 'HH:mm',
                  )}
                  weight={isFirstHour ? 'bold' : 'regular'}
                  size="l1"
                />
                <ImageWidget
                  source={{
                    uri: getWeatherIcon(item.weather[0].icon),
                  }}
                  width={48}
                  height={48}
                  customStyle={HomeStyle.wrapperWeatherInfoIconSized}
                />
                <TextWidget
                  label={`${convertTemperature(
                    item.main.temp,
                    currentTemperature,
                  )}°${currentTemperature}`}
                  weight="medium"
                  size="l1"
                />
              </View>
            );
          }}
        />
        <View style={HomeStyle.wrapperListDate}>
          <FlatList
            data={formatForecastData()}
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              width: widthByScreen(80),
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setindexselectedWeather(index);
                  }}
                  style={[
                    HomeStyle.wrapperItemTabDate,
                    {
                      backgroundColor:
                        index == indexselectedWeather
                          ? COLOR_GREY
                          : COLOR_WHITE,
                    },
                  ]}>
                  <TextWidget
                    label={formatDate(item.date, 'ddd')}
                    weight="regular"
                    size="b2"
                  />
                  <TextWidget
                    label={formatDate(item.date, 'DD')}
                    weight="medium"
                    size="b2"
                  />
                </TouchableOpacity>
              );
            }}
          />
          <Ionicons
            name="list-outline"
            size={22}
            backgroundColor={'transparent'}
            color={COLOR_BLACK}
            onPress={() => {
              setindexselectedWeather(-1);
            }}
          />
        </View>
        {renderViewSelectedWeather()}
      </View>
    );
  };
  const renderViewSelectedWeather = () => {
    if (indexselectedWeather == -1) {
      return <></>;
    }
    const selectedWeather = forecast.data[indexselectedWeather];
    return (
      <View style={HomeStyle.wrapperSelectedWeather}>
        <View style={HomeStyle.wrapperSelectedWeatherHeader}>
          <View>
            <TextWidget
              label={selectedWeather.weather[0].main}
              weight="bold"
              size="b1"
            />
            <TextWidget
              label={selectedWeather.weather[0].description}
              weight="medium"
              size="l1"
            />
          </View>
          <View style={ListItemStyle.wrapperRight}>
            <TextWidget
              label={`${selectedWeather.main.humidity} / ${convertTemperature(
                selectedWeather.main.temp,
                currentTemperature,
              )}°${currentTemperature}`}
              weight="regular"
              size="b1"
            />
            <ImageWidget
              source={{
                uri: getWeatherIcon(selectedWeather.weather[0].icon),
              }}
              width={48}
              height={48}
            />
          </View>
        </View>
        <View style={HomeStyle.wrapperChartSelectedWeatherHeader}></View>
        <ListItem
          title="Precipitation"
          showIconRight={false}
          infoRight={selectedWeather?.pop}
        />
        <ListItem
          title="Propability of Precipitation"
          showIconRight={false}
          infoRight={'-'}
        />
        <ListItem
          title="Wind"
          showIconRight={false}
          infoRight={`${selectedWeather?.wind.speed}m/s`}
        />
        <ListItem
          title="Pressure"
          showIconRight={false}
          infoRight={`${selectedWeather?.main.pressure}inHG`}
        />
        <ListItem
          title="Humidity"
          showIconRight={false}
          infoRight={`${selectedWeather?.main.humidity}%`}
        />
        <ListItem title="Uv Index" showIconRight={false} infoRight={'-'} />
      </View>
    );
  };
  return (
    <View style={HomeStyle.container}>
      <Header
        showLeft={false}
        titleCustom={
          <TouchableOpacity
            style={HomeStyle.wrapperHeader}
            onPress={() => {
              navigation.navigate('SearchCityScreen');
            }}>
            <Ionicons name="search" size={18} color={COLOR_FONT_PRIMARY} />
            <TextWidget
              label={`   ${
                config.locationName != '' ? config.locationName : data.name
              }`}
              weight="medium"
            />
            <Ionicons
              name="location-outline"
              size={18}
              color={COLOR_FONT_PRIMARY}
            />
          </TouchableOpacity>
        }
        customRight={
          <Ionicons.Button
            name="settings-outline"
            size={20}
            color={COLOR_FONT_PRIMARY}
            backgroundColor="transparent"
            onPress={() => {
              navigation.navigate('SettingScreen');
            }}
          />
        }
      />

      <View style={HomeStyle.wrapperInfoForecast}>
        <FlatList
          data={indexselectedWeather == -1 ? formatForecastData() : []}
          ListHeaderComponent={HeaderComponent}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <ListItem
                key={index}
                title={formatDate(item.date, 'ddd MMM DD')}
                infoRight={`${item.main.humidity} / ${convertTemperature(
                  item.main.temp,
                  currentTemperature,
                )}°${currentTemperature}`}
                icon={item.weather[0].icon}
                customStyleContainer={{
                  paddingVertical: 8,
                }}
                onPress={() => {
                  setindexselectedWeather(index);
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
  daily: state.weather.daily,
  forecast: state.weather.forecast,
  config: state.weather.config,
});

export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
