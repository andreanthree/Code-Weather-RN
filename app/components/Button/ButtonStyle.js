import {StyleSheet} from 'react-native';
import {COLOR_PRIMARY, SIZE_BORDER_RADIUS, SIZE_PADDING} from '../../resources/theme';

const ButtonStyle = StyleSheet.create({
  container: {
    padding: SIZE_PADDING,
    width: '100%',
    backgroundColor: COLOR_PRIMARY,
    alignItems: 'center',
    borderRadius: SIZE_BORDER_RADIUS
  },
});

export default ButtonStyle;
