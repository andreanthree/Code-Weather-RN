import {StyleSheet} from 'react-native';
import {COLOR_GREY, COLOR_WHITE, SIZE_PADDING} from '../../../resources/theme';
import {heightByScreen} from '../../../utils/dimensions';

const LoginStyle = StyleSheet.create({
  container: {
    // flex: 1,
    height: heightByScreen(100),
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
    paddingHorizontal: SIZE_PADDING,
    paddingTop: SIZE_PADDING,
  },
  userImage: {
    width: 96,
    height: 96,
    marginBottom: SIZE_PADDING,
  },
  bgIconMenu: {
    padding: SIZE_PADDING / 2,
    backgroundColor: COLOR_GREY,
    borderRadius: 25,
    marginRight: SIZE_PADDING,
  },
  wrapperMenu: {

  },
});

export default LoginStyle;
