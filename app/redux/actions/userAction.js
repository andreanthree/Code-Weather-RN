import { UPDATE_DATA_USER } from '../reducers/userReducer';

export const updateUserData = (newConfig = {}) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: UPDATE_DATA_USER,
      payload: newConfig,
    });
  };
};
