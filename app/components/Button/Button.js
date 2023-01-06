import React from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import ButtonStyle from './ButtonStyle';
import {TextWidget} from '../TextWidget';
import {COLOR_WHITE} from '../../resources/theme';
export const Button = ({
  title = '',
  customColorTitle,
  onPress = () => {},
  loading = false,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={loading ? true : disabled}
      onPress={onPress}
      style={ButtonStyle.container}>
      {loading ? (
        <ActivityIndicator color={COLOR_WHITE} />
      ) : (
        <TextWidget
          label={title}
          weight="bold"
          color={customColorTitle || COLOR_WHITE}
        />
      )}
    </TouchableOpacity>
  );
};
