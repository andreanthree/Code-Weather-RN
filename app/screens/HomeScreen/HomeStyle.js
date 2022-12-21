import {StyleSheet} from 'react-native';
import { COLOR_PRIMARY } from '../../resources/theme';

const HomeStyle = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_PRIMARY,
  },
  wrapperText: {
    alignItems: 'center',
  },
});

export default HomeStyle;
