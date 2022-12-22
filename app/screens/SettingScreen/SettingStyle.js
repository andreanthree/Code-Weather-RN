import {StyleSheet} from 'react-native';
import {
  COLOR_BORDER,
  COLOR_GREY,
  COLOR_WHITE,
  SIZE_BORDER_RADIUS,
  SIZE_PADDING,
} from '../../resources/theme';
import {widthByScreen} from '../../utils/dimensions';

const SettingStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  wrapperOption:{
    padding: 4,
    borderRadius: 8,
    backgroundColor: COLOR_GREY,
    flexDirection:'row',
  },
  wrapperOptionItem:{
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: COLOR_WHITE,
    flexDirection:'row',
  },
});

export default SettingStyle;
