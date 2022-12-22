import {StyleSheet} from 'react-native';
import {COLOR_PRIMARY, SIZE_PADDING} from '../../resources/theme';

const SplashStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
  },
  wrapperText: {
    alignItems: 'center',
    position: 'absolute',
    bottom: SIZE_PADDING,
  },
});

export default SplashStyle;
