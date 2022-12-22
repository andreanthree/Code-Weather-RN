import React, {useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components/Header/Header';
import HomeStyle from './HomeStyle';
import {TextWidget} from '../../components/TextWidget';
import {ImageWidget} from '../../components/ImageWidget';
import {COLOR_BLACK, COLOR_GREY, COLOR_WHITE} from '../../resources/theme';
import {dataDaily, dataForecast} from '../../constants/static';
import {formatDate, getWeatherIcon} from '../../utils/helper';
import {ListItem} from '../../components/ListItem/ListItem';
import {widthByScreen} from '../../utils/dimensions';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ListItemStyle from '../../components/ListItem/ListItemStyle';

const HomeScreen = ({}) => {
  const [indexselectedWeather, setindexselectedWeather] = useState(0);
  const data = dataDaily;
  let weatherInfo = data.weather[0] || {};

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
    dataForecast.list.forEach((element, index) => {
      let dtConvert = new Date(element.dt * 1000);
      let currentDate = formatDate(dtConvert, 'ddd MMM DD');
      let findIndex = data.findIndex(el => el['dateFormat'] == currentDate);
      console.log(findIndex);
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
              <TextWidget label={weatherInfo.main} weight="medium" size="b2" />
              <TextWidget
                label={weatherInfo.description}
                weight="light"
                size="l1"
              />
            </View>
          </View>
          <TextWidget
            label={`${data.main.temp}°F`}
            weight="light"
            size="t1"
            color={COLOR_BLACK}
            customStyle={{...HomeStyle.degreeInfo}}
          />
          <TextWidget
            label={`Feels like ${data.main.feels_like} °F`}
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
          {renderInfoWind('Wind', data.wind.speed)}
          {renderInfoWind('Himidity', `${data.main.humidity} %`)}
          {renderInfoWind('UV Index', data.wind.speed)}
          {renderInfoWind('Pressure', `${data.main.pressure}inHg`)}
          {renderInfoWind(
            'Visibility',
            `${Number(data.visibility / 1000).toFixed(2)}km`,
          )}
          {renderInfoWind('Dew point', `${data.main.pressure}inHg`)}
        </View>
        <FlatList
          data={dataForecast.list}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View style={HomeStyle.wrapperWeatherInfoIcon}>
                <TextWidget
                  label={formatDate(new Date(item.dt * 1000), 'HH:mm')}
                  weight="regular"
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
                  label={`${item.main.temp}°F`}
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
          <FontAwesome5
            name="chevron-right"
            size={22}
            backgroundColor={'transparent'}
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
    const selectedWeather = dataForecast.list[indexselectedWeather];
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
              label={`${selectedWeather.main.humidity} / ${selectedWeather.main.temp}°F`}
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
          infoRight={selectedWeather?.pop}
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
        <ListItem
          title="Uv Index"
          showIconRight={false}
          infoRight={selectedWeather?.pop}
        />
      </View>
    );
  };
  return (
    <View style={HomeStyle.container}>
      <Header title={data.name} />

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
                infoRight={`${item.main.humidity} / ${item.main.temp}°F`}
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
export default HomeScreen;
