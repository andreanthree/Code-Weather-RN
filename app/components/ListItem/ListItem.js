import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import ListItemStyle from './ListItemStyle';
import {TextWidget} from '../TextWidget';
import {getWeatherIcon} from '../../utils/helper';
import {ImageWidget} from '../ImageWidget';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export const ListItem = ({
  title = '',
  infoRight = '',
  icon = '',
  customLeft,
  customRight,
  showIconRight = true,
  onPress = () => {},
  customStyleContainer = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[ListItemStyle.container, customStyleContainer]}>
      <View style={ListItemStyle.wrapperLeft}>
        {customLeft || <></>}
        <TextWidget label={title} weight="regular" size="b1" />
      </View>
      {customRight || (
        <View style={ListItemStyle.wrapperRight}>
          <TextWidget label={infoRight} weight="regular" size="b1" />
          {icon != '' ? (
            <ImageWidget
              source={{
                uri: getWeatherIcon(icon),
              }}
              width={48}
              height={48}
            />
          ) : (
            <></>
          )}
          {showIconRight ? (
            <FontAwesome5 name="chevron-right" size={22} />
          ) : (
            <></>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};
