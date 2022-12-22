import React from 'react';
import {TouchableOpacity} from 'react-native';
import ButtonStyle from './ButtonStyle';
import {TextWidget} from '../TextWidget';
import {COLOR_WHITE} from '../../resources/theme';
export const Button = ({title = '', customColorTitle, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} style={ButtonStyle.container}>
      <TextWidget
        label={title}
        weight="bold"
        color={customColorTitle || COLOR_WHITE}
      />
    </TouchableOpacity>
  );
};
