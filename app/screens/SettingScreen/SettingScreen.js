import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Header} from '../../components/Header/Header';
import SettingStyle from './SettingStyle';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateConfigData} from '../../redux/actions/weatherAction';
import {menuSetting} from '../../constants/static';
import {ListItem} from '../../components/ListItem/ListItem';
import {TextWidget} from '../../components/TextWidget';
import {COLOR_GREY, COLOR_WHITE} from '../../resources/theme';

const SettingScreen = ({navigation, config, updateConfigData}) => {
  return (
    <View style={SettingStyle.container}>
      <Header title="Setting" />
      <FlatList
        data={menuSetting}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <ListItem
              key={index}
              title={item.name}
              customRight={
                <View style={SettingStyle.wrapperOption}>
                  {item.option.map((el, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          let tmpConfig = config;
                          tmpConfig[`${item.keyConfig}`] = el.id;
                          updateConfigData(tmpConfig);
                        }}
                        style={[
                          SettingStyle.wrapperOptionItem,
                          {
                            backgroundColor:
                              el.id != config[item.keyConfig]
                                ? COLOR_GREY
                                : COLOR_WHITE,
                          },
                        ]}>
                        <TextWidget label={el.label} />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              }
              customStyleContainer={{
                paddingVertical: 8,
              }}
              onPress={() => {}}
            />
          );
        }}
      />
    </View>
  );
};

export const mapStateToProps = state => ({
  config: state.weather.config,
});

export const mapDispatchToProps = dispatch => ({
  updateConfigData: bindActionCreators(updateConfigData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
