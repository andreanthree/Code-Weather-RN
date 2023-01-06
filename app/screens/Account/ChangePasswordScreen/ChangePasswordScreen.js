import React, {useState} from 'react';
import {Keyboard, ScrollView, ToastAndroid, View} from 'react-native';
import ChangePasswordStyle from './ChangePasswordStyle';
import {TextWidget} from '../../../components/TextWidget';
import {connect} from 'react-redux';
import {Button} from '../../../components/Button/Button';
import {Input} from '../../../components/Input/Input';
import {Header} from '../../../components/Header/Header';
import {bindActionCreators} from 'redux';
import {updateUserData} from '../../../redux/actions/userAction';
import {userChangePasswordDb, userChangeProfileDb} from '../../../services/database';
import storageKey from '../../../constants/storageKey';
import storage from '../../../utils/storage';

const ChangePasswordScreen = ({navigation, user, saveUserData}) => {
  const [form, setForm] = useState({
    oldPassword: '',
    oldPasswordError: '',
    newPassword: '',
    newPasswordError: '',
    confirmNewPassword: '',
    confirmNewPasswordError: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const onSubmit = () => {
    let newForm = {};
    if (form.oldPassword == '') {
      newForm['oldPasswordError'] = 'Password Lama Wajib di Isi';
    }
    if (form.newPassword == '') {
      newForm['newPasswordError'] = 'Password Baru Wajib di Isi';
    }
    if (form.confirmNewPassword == '') {
      newForm['confirmNewPasswordError'] =
        'Konfirmasi Password Baru Wajib di Isi';
    } else if (form.confirmNewPassword != form.newPassword) {
      newForm['confirmNewPasswordError'] = 'Konfirmasi Password Salah';
    }

    if (Object.keys(newForm).length) {
      setForm({
        ...form,
        ...newForm,
      });
    } else {
      Keyboard.dismiss();
      setLoadingSubmit(true);
      const newDataUser = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
        id: user.id,
      };
      userChangePasswordDb(newDataUser, async res => {
        setLoadingSubmit(false);
        if (res.success) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          navigation.pop();
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      });
    }
  };
  return (
    <View>
      <Header title="Ganti Password" />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={[ChangePasswordStyle.container]}>
          <TextWidget
            label="Gnati password akun anda secara berkala."
            weight="medium"
          />
          <View style={ChangePasswordStyle.wrapperInput}>
            <Input
              label="Password Lama"
              placeholder="Masukkan Password Lama"
              keyboardType="password"
              secureTextEntry
              value={form.oldPassword}
              errorMessage={form.oldPasswordError}
              onChangeText={text =>
                setForm({
                  ...form,
                  oldPassword: text,
                  oldPasswordError: text != '' ? '' : form.oldPasswordError,
                })
              }
            />
            <Input
              label="Password Baru"
              placeholder="Masukkan Password Baru"
              keyboardType="password"
              secureTextEntry
              value={form.newPassword}
              errorMessage={form.newPasswordError}
              onChangeText={text =>
                setForm({
                  ...form,
                  newPassword: text,
                  newPasswordError: text != '' ? '' : form.newPasswordError,
                })
              }
            />
            <Input
              label="Konfirmasi Password Baru"
              placeholder="Masukkan Konfirmasi Password Baru"
              keyboardType="password"
              secureTextEntry
              value={form.confirmNewPassword}
              errorMessage={form.confirmNewPasswordError}
              onChangeText={text =>
                setForm({
                  ...form,
                  confirmNewPassword: text,
                  confirmNewPasswordError:
                    text != '' ? '' : form.confirmNewPasswordError,
                })
              }
            />
          </View>

          <Button
            title="SIMPAN"
            onPress={() => {
              onSubmit();
            }}
            loading={loadingSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export const mapStateToProps = state => ({
  user: state.user.data,
});

export const mapDispatchToProps = dispatch => ({
  saveUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChangePasswordScreen);
