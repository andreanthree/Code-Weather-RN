import React, {useState} from 'react';
import {
  Image,
  Keyboard,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginStyle from './LoginStyle';
import {TextWidget} from '../../../components/TextWidget';
import {connect} from 'react-redux';
import images from '../../../resources/images';
import {Button} from '../../../components/Button/Button';
import {Input} from '../../../components/Input/Input';
import {COLOR_PRIMARY} from '../../../resources/theme';
import {bindActionCreators} from 'redux';
import {updateUserData} from '../../../redux/actions/userAction';
import {userLoginDb} from '../../../services/database';
import storage from '../../../utils/storage';
import storageKey from '../../../constants/storageKey';

const LoginScreen = ({navigation, saveUserData}) => {
  const [form, setForm] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const onSubmit = () => {
    let newForm = {};
    if (form.email == '') {
      newForm['emailError'] = 'Email Wajib di Isi';
    }
    if (form.password == '') {
      newForm['passwordError'] = 'Password Wajib di Isi';
    }

    if (Object.keys(newForm).length) {
      setForm({
        ...form,
        ...newForm,
      });
    } else {
      Keyboard.dismiss();
      setLoadingSubmit(true);
      userLoginDb(
        {
          email: form.email,
          password: form.password,
        },
        async res => {
          setLoadingSubmit(false);
          if (res.success) {
            const dataUser = {
              email: form.email,
              name: res.data.name_user,
              address: res.data.address,
              id: res.data.user_id,
            };
            await saveUserData(dataUser);
            await storage.set(storageKey.DATA_USER, dataUser);

            navigation.replace('HomeScreen');
          } else if (res.code == '10') {
            ToastAndroid.show(
              'Email anda belum registrasi, silahkan registrasi terlebih dahulu.',
              ToastAndroid.LONG,
            );
            navigation.navigate('RegisterScreen', {email: form.email});
          } else {
            ToastAndroid.show(res.message, ToastAndroid.LONG);
          }
        },
      );
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <View style={[LoginStyle.container]}>
        <Image source={images.logo} style={LoginStyle.logo} />
        <TextWidget label="Selamat Datang" size="s2" weight="bold" />
        <TextWidget label="Silahkan Masuk ke akun anda" size="b2" />
        <View style={LoginStyle.wrapperInput}>
          <Input
            label="Email"
            placeholder="Masukkan Email Anda"
            keyboardType="email-address"
            value={form.email}
            errorMessage={form.emailError}
            onChangeText={text =>
              setForm({
                ...form,
                email: text,
                emailError: text != '' ? '' : form.emailError,
              })
            }
          />
          <Input
            label="Password"
            placeholder="Masukkan Password Anda"
            secureTextEntry
            value={form.password}
            errorMessage={form.passwordError}
            onChangeText={text =>
              setForm({
                ...form,
                password: text,
                passwordError: text != '' ? '' : form.passwordError,
              })
            }
          />
        </View>

        <Button
          title="MASUK"
          onPress={() => {
            onSubmit();
          }}
          loading={loadingSubmit}
        />
        <View style={LoginStyle.wrapperRegister}>
          <TextWidget>Belum Punya Akun? </TextWidget>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterScreen')}>
            <TextWidget color={COLOR_PRIMARY} weight="bold">
              Buat Akun
            </TextWidget>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => ({
  saveUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
