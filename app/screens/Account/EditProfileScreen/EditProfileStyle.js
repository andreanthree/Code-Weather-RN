import {StyleSheet} from 'react-native';
import {COLOR_GREY, COLOR_WHITE, SIZE_PADDING} from '../../../resources/theme';
import {heightByScreen} from '../../../utils/dimensions';

const EditProfileStyle = StyleSheet.create({
  container: {
    // flex: 1,
    height: heightByScreen(100),
    backgroundColor: COLOR_WHITE,
    paddingHorizontal: SIZE_PADDING,
    paddingTop: SIZE_PADDING,
  },
  wrapperInput: {
    marginVertical: SIZE_PADDING,
  },
});

export default EditProfileStyle;
