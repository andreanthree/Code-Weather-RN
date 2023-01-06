import {StyleSheet} from 'react-native';
import {COLOR_WHITE, SIZE_PADDING} from '../../../resources/theme';
import {heightByScreen} from '../../../utils/dimensions';

const LoginStyle = StyleSheet.create({
  container: {
    // flex: 1,
    height: heightByScreen(100),
    backgroundColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZE_PADDING,
  },
  logo: {
    width: 124,
    height: 124,
    marginBottom: SIZE_PADDING,
  },
  wrapperInput: {
    paddingHorizontal: SIZE_PADDING,
    marginTop: SIZE_PADDING * 2,
    marginBottom: SIZE_PADDING,
  },
  wrapperRegister: {
    flexDirection: 'row',
    marginTop: SIZE_PADDING,
  },
});

export default LoginStyle;
