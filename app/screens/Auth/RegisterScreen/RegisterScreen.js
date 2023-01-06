import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextWidget} from '../../../components/TextWidget';
import {connect} from 'react-redux';
import images from '../../../resources/images';
import {Button} from '../../../components/Button/Button';
import {Input} from '../../../components/Input/Input';
import {COLOR_PRIMARY} from '../../../resources/theme';
import LoginStyle from '../LoginScreen/LoginStyle';
import {userRegisterDb} from '../../../services/database';

const RegisterScreen = ({navigation, route}) => {
  const [form, setForm] = useState({
    email: route?.params?.email || '',
    emailError: '',
    password: '',
    passwordError: '',
    address: '',
    addressError: '',
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
    if (form.address == '') {
      newForm['addressError'] = 'Alamat Wajib di Isi';
    }

    if (Object.keys(newForm).length) {
      setForm({
        ...form,
        ...newForm,
      });
    } else {
      setLoadingSubmit(true);
      userRegisterDb(
        {
          email: form.email,
          password: form.password,
          address: form.address,
        },
        async res => {
          setLoadingSubmit(false);
          if (res.success) {
            ToastAndroid.show(res.message, ToastAndroid.LONG);
            navigation.replace('LoginScreen');
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
        <TextWidget label="Buat Akun" size="s2" weight="bold" />
        <TextWidget label="Ayo Bergabung Bersama Kami" size="b2" />
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
          <Input
            label="Alamat"
            placeholder="Masukkan Alamat Anda"
            value={form.address}
            errorMessage={form.addressError}
            onChangeText={text =>
              setForm({
                ...form,
                address: text,
                addressError: text != '' ? '' : form.addressError,
              })
            }
          />
        </View>

        <Button
          title="Buat Akun"
          onPress={() => {
            onSubmit();
          }}
          loading={loadingSubmit}
        />
        <View style={LoginStyle.wrapperRegister}>
          <TextWidget>Sudah Punya Akun? </TextWidget>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <TextWidget color={COLOR_PRIMARY} weight="bold">
              Masuk
            </TextWidget>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const mapStateToProps = state => ({});

export const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
