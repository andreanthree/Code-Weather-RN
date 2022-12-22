import {StyleSheet} from 'react-native';
import {COLOR_BORDER, COLOR_WHITE, SIZE_PADDING} from '../../resources/theme';
import {widthByScreen} from '../../utils/dimensions';

const ListItemStyle = StyleSheet.create({
  container: {
    paddingHorizontal: SIZE_PADDING * 0.5,
    paddingVertical: SIZE_PADDING,
    width: '100%',
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLOR_BORDER,
    borderBottomWidth: 1,
  },
  wrapperRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListItemStyle;
