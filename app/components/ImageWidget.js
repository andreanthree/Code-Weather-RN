import React from 'react';
import {Image} from 'react-native';

export const ImageWidget = ({
  source,
  width = 10,
  height = 10,
  resizeMode = 'contain',
  customStyle = {},
}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[{width, height}, customStyle]}
    />
  );
};
