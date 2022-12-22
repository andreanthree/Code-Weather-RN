import {StyleSheet} from 'react-native';
import {COLOR_PRIMARY, COLOR_WHITE, SIZE_BORDER_RADIUS, SIZE_PADDING} from '../../resources/theme';
import { widthByScreen } from '../../utils/dimensions';

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
  containerModal: {
    backgroundColor: COLOR_WHITE,
    padding: SIZE_PADDING,
    borderRadius: SIZE_BORDER_RADIUS,
    width: widthByScreen(95),
    alignSelf: 'center',
  },
  descriptionModal: {
    paddingTop: SIZE_PADDING * 0.7,
    paddingBottom: SIZE_PADDING * 1.5,
  },
  exitText:{
    marginTop: SIZE_PADDING,
    marginBottom: SIZE_PADDING * 0.3,
    width:'100%',
    alignItems:'center'
  }
});

export default SplashStyle;
