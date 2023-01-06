import {StyleSheet} from 'react-native';
import {COLOR_BORDER, COLOR_WHITE, SIZE_PADDING} from '../../resources/theme';
import {widthByScreen} from '../../utils/dimensions';

const InputStyle = StyleSheet.create({
  labelStyle: {
    marginBottom: 10,
  },
  container: {
    width: widthByScreen(100) - SIZE_PADDING * 2,
    marginVertical: SIZE_PADDING / 2,
  },

  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CACCCF',
    height: 48,
    marginTop: 6,
    padding: 10,
    position: 'relative',
    width: '100%',
  },
  errorText: {
    marginTop: 8,
    color: '#E00228',
  },
  showPass: {
    padding: 12,
    position: 'absolute',
    right: 0,
  },
  basicInputImage: {
    width: 20,
    height: 20,
  },
});

export default InputStyle;
