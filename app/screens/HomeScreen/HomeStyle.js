import {StyleSheet} from 'react-native';
import {
  COLOR_BORDER,
  COLOR_GREY,
  COLOR_WHITE,
  SIZE_BORDER_RADIUS,
  SIZE_PADDING,
} from '../../resources/theme';

const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_WHITE,
  },
  containerContent: {
    alignItems: 'center',
    paddingHorizontal: SIZE_PADDING / 2,
    // paddingBottom: SIZE_PADDING,
  },
  infoHeader: {
    paddingVertical: SIZE_PADDING * 1.5,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  degreeInfo: {
    paddingTop: 8,
    paddingBottom: SIZE_PADDING,
  },
  wrapperChart: {
    marginVertical: SIZE_PADDING * 0.5,
    height: 100,
  },
  wrapperInfoWind: {
    paddingHorizontal: SIZE_PADDING,
    paddingBottom: SIZE_PADDING,
    borderRadius: SIZE_BORDER_RADIUS,
    backgroundColor: COLOR_GREY,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
  },
  textInfoWind: {
    width: '30%',
    paddingTop: SIZE_PADDING,
  },
  wrapperInfoForecast: {
    // marginHorizontal: SIZE_PADDING * 0.5,
  },
  wrapperWeatherInfoIcon: {
    paddingTop: SIZE_PADDING,
    paddingHorizontal: SIZE_PADDING * 0.5,
    alignItems: 'center',
  },
  wrapperWeatherInfoIconSized: {
    paddingVertical: SIZE_PADDING,
  },
  wrapperItemTabDate: {
    padding: 6,
    borderRadius: SIZE_BORDER_RADIUS * 0.5,
    backgroundColor: COLOR_WHITE,
    alignItems: 'center',
  },
  wrapperListDate: {
    width: '100%',
    paddingLeft: SIZE_PADDING * 0.5,
    paddingVertical: SIZE_PADDING,
    paddingBottom: SIZE_PADDING * 0.5,
    borderBottomColor: COLOR_BORDER,
    borderBottomWidth: 1,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
});

export default HomeStyle;
