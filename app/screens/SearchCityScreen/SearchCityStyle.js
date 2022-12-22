import {StyleSheet} from 'react-native';
import {
  COLOR_BORDER,
  COLOR_GREY,
  COLOR_WHITE,
  SIZE_BORDER_RADIUS,
  SIZE_PADDING,
} from '../../resources/theme';
import {widthByScreen} from '../../utils/dimensions';

const SearchCityStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  containerSearch: {
    paddingVertical: SIZE_PADDING * 0.4,
    paddingHorizontal: SIZE_PADDING,
    backgroundColor: COLOR_GREY,
    borderRadius: 25,
    width: widthByScreen(80),
    height: 46,
    flexDirection:'row',
    alignItems:'center'
  },
  inputSearch: {
    width: '80%',
    height: 46,
    marginLeft: 8,
  },
  wrapperHeaderFlatlist:{
    width:'100%',
    paddingVertical: SIZE_PADDING,
    alignItems:'center',
  }
});

export default SearchCityStyle;
