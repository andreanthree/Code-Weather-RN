import {Image, TextInput, TouchableOpacity, View} from 'react-native';
import {COLOR_BORDER_FORM, COLOR_EVENT_ERROR} from '../../resources/theme';
import {TextWidget} from '../TextWidget';
import InputStyle from './InputStyle';

export const Input = props => {
  const {
    image,
    label = '',
    editable = true,
    errorMessage = '',
    customContainer = {},
    customError,
    customTextInput,
    onPressPIN,
    imgStyle,
    value,
    placeholder,
    onChangeText,
  } = props;
  return (
    <View style={[InputStyle.container, customContainer]}>
      {label != '' ? (
        <TextWidget style={InputStyle.labelStyle} size="b2">
          {label}
        </TextWidget>
      ) : (
        <></>
      )}
      <TextInput
        placeholder={placeholder}
        style={[
          editable ? InputStyle.textInput : InputStyle.textInputInactive,
          customTextInput,
          {
            borderColor:
              errorMessage === '' ? COLOR_BORDER_FORM : COLOR_EVENT_ERROR,
          },
        ]}
        value={value}
        underlineColorAndroid={'transparent'}
        {...props}
      />
      <TouchableOpacity style={InputStyle.showPass} onPress={onPressPIN}>
        {image !== null && (
          <Image
            source={image}
            style={[InputStyle.basicInputImage, imgStyle]}
          />
        )}
      </TouchableOpacity>
      {errorMessage != '' && (
        <TextWidget
          size="b2"
          style={[InputStyle.errorText, customError]}
          color={COLOR_EVENT_ERROR}>
          {errorMessage}
        </TextWidget>
      )}
    </View>
  );
};
