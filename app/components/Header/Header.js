import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import HeaderStyle from './HeaderStyle';
import {TextWidget} from '../TextWidget';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export const Header = ({
  title = '',
  titleCustom,
  showLeft = true,
  customLeft,
  customRight = true,
}) => {
  return (
    <View style={HeaderStyle.container}>
      <View style={HeaderStyle.containerLeft}>
        {showLeft ? (
          customLeft || (
            <TouchableOpacity style={HeaderStyle.wrapperIconLeft}>
              <MaterialIcons name="arrow-back" size={22} />
            </TouchableOpacity>
          )
        ) : (
          <></>
        )}
        <TextWidget label={title} weight="medium" />
      </View>
    </View>
  );
};
