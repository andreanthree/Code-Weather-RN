import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  ToastAndroid,
  View,
  TouchableOpacity,
} from 'react-native';
import ProfileStyle from './ProfileStyle';
import {TextWidget} from '../../../components/TextWidget';
import {connect} from 'react-redux';
import images from '../../../resources/images';
import {Header} from '../../../components/Header/Header';
import {ListItem} from '../../../components/ListItem/ListItem';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '../../../utils/storage';
import storageKey from '../../../constants/storageKey';
import {updateUserData} from '../../../redux/actions/userAction';
import {bindActionCreators} from 'redux';
import ReactNativeModal from 'react-native-modal';
import SplashStyle from '../../SplashScreen/SplashStyle';
import {Button} from '../../../components/Button/Button';

const ProfileScreen = ({navigation, user, saveUserData}) => {
  const [modalLogout, setmodalLogout] = useState(false);
  const onLogout = async () => {
    const dataUser = {
      email: '',
      name: '',
      address: '',
      id: '',
    };
    await storage.remove(storageKey.DATA_USER);
    await saveUserData(dataUser);
    ToastAndroid.show('Berhasil Logout', ToastAndroid.LONG);

    navigation.replace('HomeScreen');
  };

  const renderModalLogout = () => (
    <ReactNativeModal
      isVisible={modalLogout}
      useNativeDriver
      animationIn={'fadeInDown'}
      style={{margin: 0}}>
      <View style={SplashStyle.containerModal}>
        <TextWidget label="Konfirmasi" size="s2" weight="bold" />
        <TextWidget
          label="Apakah anda yakin ingin keluar dari akun ini?"
          size="b2"
          weight="regular"
          customStyle={SplashStyle.descriptionModal}
        />
        <Button
          title="Ya Keluar"
          onPress={() => {
            setmodalLogout(false);
            onLogout();
          }}
        />
        <TouchableOpacity
          style={SplashStyle.exitText}
          onPress={() => {
            setmodalLogout(false);
          }}>
          <TextWidget label="Batal" size="b2" weight="bold" />
        </TouchableOpacity>
      </View>
    </ReactNativeModal>
  );
  return (
    <View>
      <Header showLeft={false} title="Profil Saya" />
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={[ProfileStyle.container]}>
          <Image source={images.user} style={ProfileStyle.userImage} />
          <TextWidget
            label={user.name == '' ? 'Profil Belum Lengkap' : user.name}
            size="s2"
            weight="bold"
          />
          <TextWidget
            label={user.email}
            size="b1"
            weight="bold"
            customStyle={{paddingBottom: 12}}
          />
          <ListItem
            customLeft={
              <View style={ProfileStyle.bgIconMenu}>
                <MaterialCommunityIcons name="account-edit" size={20} />
              </View>
            }
            title="Edit Profil"
            onPress={() => {
              navigation.navigate('EditProfileScreen');
            }}
          />
          <ListItem
            customLeft={
              <View style={ProfileStyle.bgIconMenu}>
                <MaterialCommunityIcons name="security" size={20} />
              </View>
            }
            title="Ganti Password"
            onPress={() => {
              navigation.navigate('ChangePasswordScreen');
            }}
          />
          <ListItem
            customLeft={
              <View style={ProfileStyle.bgIconMenu}>
                <MaterialCommunityIcons name="exit-to-app" size={20} />
              </View>
            }
            title="Keluar"
            onPress={() => {
              // onLogout();
              setmodalLogout(true);
            }}
          />
        </View>
      </ScrollView>
      {renderModalLogout()}
    </View>
  );
};

export const mapStateToProps = state => ({
  user: state.user.data,
});

export const mapDispatchToProps = dispatch => ({
  saveUserData: bindActionCreators(updateUserData, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
