import React from 'react';
import {FlatList, TextInput, View} from 'react-native';
import {Header} from '../../components/Header/Header';
import SearchCityStyle from './SearchCityStyle';
import {TextWidget} from '../../components/TextWidget';
import {ImageWidget} from '../../components/ImageWidget';
import {COLOR_BLACK} from '../../resources/theme';
import {getFlagIcon} from '../../utils/helper';
import {ListItem} from '../../components/ListItem/ListItem';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  getLocationData,
  updateConfigData,
} from '../../redux/actions/weatherAction';

const SearchCityScreen = ({
  navigation,
  location,
  loadLocation,
  updateConfigData,
}) => {
  const {data, loading, keyword} = location;
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
              autoFocus
              placeholder="Search city"
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

      <FlatList
        data={data}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          if (loading) {
            return (
              <View style={SearchCityStyle.wrapperHeaderFlatlist}>
                <TextWidget label="Loading . . ." weight="bold" />
              </View>
            );
          } else if (data.length == 0 && keyword != '') {
            return (
              <View style={SearchCityStyle.wrapperHeaderFlatlist}>
                <TextWidget label="Empty Data" weight="bold" />
                <TextWidget label="please try with another keyword" size="l1" />
              </View>
            );
          }
          return <></>;
        }}
        // contentContainerStyle={{alignItems:'center'}}
        renderItem={({item, index}) => {
          const title = `  ${item.name}, ${item.state}, ${item.country}`;
          return (
            <ListItem
              key={index}
              title={title}
              // customStyleContainer={{
              //   paddingVertical: 8,
              // }}
              customLeft={
                <ImageWidget
                  source={{
                    uri: getFlagIcon(item.country),
                  }}
                  width={26}
                  height={26}
                />
              }
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
