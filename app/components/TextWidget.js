import React from 'react';
import {Text} from 'react-native';
import {
  COLOR_FONT_PRIMARY,
  COLOR_FONT_SECONDARY,
  FONT_PRIMARY_BOLD,
  FONT_PRIMARY_LIGHT,
  FONT_PRIMARY_MEDIUM,
  FONT_PRIMARY_REGULAR,
} from '../resources/theme';

export const TextWidget = ({
  label = '',
  size = 'b1',
  weight = 'regular',
  customStyle = {},
  children,
  color,
}) => {
  const generateSize = () => {
    switch (size) {
      case 'h1':
        return 36;
      case 'h2':
        return 32;
      case 'h3':
        return 28;
      case 's1':
        return 24;
      case 's2':
        return 20;
      case 's3':
        return 18;
      case 'b1':
        return 16;
      case 'b2':
        return 14;
      case 'l1':
        return 12;
      case 'l2':
        return 10;
      case 'l3':
        return 8;
      default:
        return 16;
    }
  };
  const generateFont = () => {
    switch (weight) {
      case 'bold':
        return FONT_PRIMARY_BOLD;
      case 'medium':
        return FONT_PRIMARY_MEDIUM;
      case 'light':
        return FONT_PRIMARY_LIGHT;
      default:
        return FONT_PRIMARY_REGULAR;
    }
  };
  const generateWeight = () => {
    switch (weight) {
      case 'bold':
        return 'bold';
      case 'medium':
        return '600';
      case 'light':
        return '200';
      default:
        return '400';
    }
  };
  const generateColor = () => {
    switch (weight) {
      case 'bold':
        return COLOR_FONT_PRIMARY;
      case 'medium':
        return COLOR_FONT_PRIMARY;
      case 'light':
        return COLOR_FONT_SECONDARY;
      default:
        return COLOR_FONT_SECONDARY;
    }
  };
  return (
    <Text
      style={[
        {
          fontSize: generateSize(),
          fontFamily: generateFont(),
          fontWeight: generateWeight(),
          color: color || generateColor(),
        },
        customStyle,
      ]}>
      {children || label}
    </Text>
  );
};
