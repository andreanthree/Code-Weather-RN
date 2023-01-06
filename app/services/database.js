import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({
  name: 'weather.db',
  location: 'default',
  createFromLocation: 2,
});

export const userLoginDb = async (params, callback) => {
  try {
    console.log('params', params);
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_user WHERE email=?`,
        [params.email],
        (tx, results) => {
          if (results.rows.length > 0) {
            if (results.rows.item(0).password == params.password) {
              callback({
                code: '00',
                success: true,
                message: 'Berhasil',
                data: results.rows.item(0),
              });
            } else {
              callback({
                code: '11',
                success: false,
                message: 'Password Salah',
              });
            }
          } else {
            callback({
              code: '10',
              success: false,
              message: 'Email Tidak Terdaftar',
            });
          }
        },
      );
    });
  } catch (error) {
    callback({
      code: '-1',
      success: false,
      message: 'Terjadi Kesalahan',
    });
  }
};
export const userRegisterDb = async (params, callback) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_user WHERE email=?`,
        [params.email],
        (tx, results) => {
          console.log('results.rows.item.length', results.rows.length);
          if (results.rows.length === 0) {
            tx.executeSql(
              'INSERT INTO table_user (name_user, email, password, address) VALUES (?,?,?,?)',
              ['', params.email, params.password, params.address],
              (tx, results) => {
                console.log('results regis', results);
                if (results.rowsAffected > 0) {
                  callback({
                    success: true,
                    message: 'Registrasi Berhasil',
                  });
                } else {
                  callback({
                    success: false,
                    message: 'Registrasi Gagal Silahkan Coba Lagi',
                  });
                }
              },
            );
          } else {
            callback({
              success: false,
              message: 'Email Telah Terdaftar',
            });
          }
        },
      );
    });
  } catch (error) {
    callback({
      success: false,
      message: 'Terjadi Kesalahan',
    });
  }
};
export const userChangeProfileDb = async (params, callback) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_user WHERE email=? and user_id!=?`,
        [params.email, params.id],
        (tx, results) => {
          console.log('results.rows.item.length', results.rows.length);
          if (results.rows.length === 0) {
            tx.executeSql(
              'UPDATE table_user set name_user=?, email=?, address=? where user_id=?',
              [params.name, params.email, params.address, params.id],
              (tx, results) => {
                console.log('results regis', results);
                if (results.rowsAffected > 0) {
                  callback({
                    success: true,
                    message: 'Ganti Profile Berhasil',
                  });
                } else {
                  callback({
                    success: false,
                    message: 'Ganti Profile Gagal Silahkan Coba Lagi',
                  });
                }
              },
            );
          } else {
            callback({
              success: false,
              message: 'Email Telah Terdaftar',
            });
          }
        },
      );
    });
  } catch (error) {
    callback({
      success: false,
      message: 'Terjadi Kesalahan',
    });
  }
};
export const userChangePasswordDb = async (params, callback) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM table_user WHERE user_id=?`,
        [params.id],
        (tx, results) => {
          console.log('results.rows.item.length', results.rows.length);
          if (results.rows.length > 0) {
            if (results.rows.item(0).password == params.oldPassword) {
              tx.executeSql(
                'UPDATE table_user set password=? where user_id=?',
                [params.newPassword, params.id],
                (tx, results) => {
                  console.log('results regis', results);
                  if (results.rowsAffected > 0) {
                    callback({
                      success: true,
                      message: 'Ganti Password Berhasil',
                    });
                  } else {
                    callback({
                      success: false,
                      message: 'Ganti Password Gagal Silahkan Coba Lagi',
                    });
                  }
                },
              );
            } else {
              callback({
                success: false,
                message: 'Password Lama Salah',
              });
            }
          } else {
            callback({
              success: false,
              message: 'Akun Tidak Ditemukan',
            });
          }
        },
      );
    });
  } catch (error) {
    callback({
      success: false,
      message: 'Terjadi Kesalahan',
    });
  }
};
