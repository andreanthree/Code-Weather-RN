import {StyleSheet} from 'react-native';
import {COLOR_BORDER, COLOR_WHITE, SIZE_PADDING} from '../../resources/theme';
import {widthByScreen} from '../../utils/dimensions';

const HeaderStyle = StyleSheet.create({
  container: {
    padding: SIZE_PADDING,
    width: widthByScreen(),
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLOR_BORDER,
    borderBottomWidth: 1,
  },
  containerLeft: {
    width: widthByScreen(80),
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperIconLeft: {
    paddingRight: SIZE_PADDING,
  },
});

export default HeaderStyle;
