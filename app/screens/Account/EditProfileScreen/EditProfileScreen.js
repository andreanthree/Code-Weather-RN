import React, {useState} from 'react';
import {Keyboard, ScrollView, ToastAndroid, View} from 'react-native';
import EditProfileStyle from './EditProfileStyle';
import {TextWidget} from '../../../components/TextWidget';
import {connect} from 'react-redux';
import {Button} from '../../../components/Button/Button';
import {Input} from '../../../components/Input/Input';
import {Header} from '../../../components/Header/Header';
import {bindActionCreators} from 'redux';
import {updateUserData} from '../../../redux/actions/userAction';
import {userChangeProfileDb} from '../../../services/database';
import storageKey from '../../../constants/storageKey';
import storage from '../../../utils/storage';

const EditProfileScreen = ({navigation, user, saveUserData}) => {
  const [form, setForm] = useState({
    email: user.email,
    emailError: '',
    name: user.name,
    nameError: '',
    address: user.address,
    addressError: '',
  });
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const onSubmit = () => {
    let newForm = {};
    if (form.email == '') {
      newForm['emailError'] = 'Email Wajib di Isi';
    }
    if (form.name == '') {
      newForm['nameError'] = 'Nama Wajib di Isi';
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
      Keyboard.dismiss();
      setLoadingSubmit(true);
      const newDataUser = {
        email: form.email,
        name: form.name,
        id: user.id,
        address: form.address,
      };
      userChangeProfileDb(newDataUser, async res => {
        setLoadingSubmit(false);
        if (res.success) {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
          await saveUserData(newDataUser);
          await storage.set(storageKey.DATA_USER, newDataUser);
          navigation.pop();
        } else {
          ToastAndroid.show(res.message, ToastAndroid.LONG);
        }
      });
    }
  };
  return (
    <View>
      <Header title="Edit Profil" />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={[EditProfileStyle.container]}>
          <TextWidget
            label="Lengkapi data akun anda, Semua input wajib di isi."
            weight="medium"
          />
          <View style={EditProfileStyle.wrapperInput}>
            <Input
              label="Nama"
              placeholder="Masukkan Nama Anda"
              value={form.name}
              errorMessage={form.nameError}
              onChangeText={text =>
                setForm({
                  ...form,
                  name: text,
                  nameError: text != '' ? '' : form.nameError,
                })
              }
            />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
