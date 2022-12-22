import {ENDPOINT} from '../../services/endpoint';
import {
  UPDATE_DATA_CONFIG,
  UPDATE_DATA_DAILY,
  UPDATE_DATA_FORECAST,
  UPDATE_DATA_LOCATION,
} from './../reducers/weatherReducer';

export const updateStateDaily = data => ({
  type: UPDATE_DATA_DAILY,
  payload: data,
});
export const updateStateForecast = data => ({
  type: UPDATE_DATA_FORECAST,
  payload: data,
});
export const updateStateLocation = data => ({
  type: UPDATE_DATA_LOCATION,
  payload: data,
});

export const getDailyData = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const {latitude, longitude} = state.weather.config;
    const params = {
      lat: latitude,
      lon: longitude,
    };
    await dispatch(
      updateStateDaily({
        loading: true,
      }),
    );

    try {
      const responseAPI = await ENDPOINT.getDaily(params);
      console.log('responseAPI', responseAPI);

      if (responseAPI.status == 200) {
        await dispatch(
          updateStateDaily({
            loading: false,
            data: responseAPI.data,
          }),
        );
      } else {
        dispatch(
          updateStateDaily({
            loading: false,
            error: true,
            data: {},
          }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        updateStateDaily({
          loading: false,
          error: true,
          data: {},
        }),
      );
    }
  };
};
export const getForeCastData = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const {latitude, longitude} = state.weather.config;
    const params = {
      lat: latitude,
      lon: longitude,
    };
    await dispatch(
      updateStateForecast({
        loading: true,
      }),
    );

    try {
      const responseAPI = await ENDPOINT.getForecast(params);
      console.log('responseAPI', responseAPI);

      if (responseAPI.status == 200) {
        await dispatch(
          updateStateForecast({
            loading: false,
            data: responseAPI.data.list,
          }),
        );
      } else {
        dispatch(
          updateStateForecast({
            loading: false,
            error: true,
            data: [],
          }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        updateStateForecast({
          loading: false,
          error: true,
          data: [],
        }),
      );
    }
  };
};
export const getLocationData = (keyword = '') => {
  return async (dispatch, getState) => {
    const params = {
      q: keyword,
      limit: 12,
    };
    await dispatch(
      updateStateLocation({
        loading: true,
        data: {},
      }),
    );

    try {
      const responseAPI = await ENDPOINT.getGeocoding(params);
      console.log('responseAPI', responseAPI);

      if (responseAPI.status == 200) {
        await dispatch(
          updateStateLocation({
            loading: false,
            data: responseAPI.data,
          }),
        );
      } else {
        dispatch(
          updateStateLocation({
            loading: false,
            error: true,
            data: [],
          }),
        );
      }
    } catch (error) {
      console.log(error);
      dispatch(
        updateStateLocation({
          loading: false,
          error: true,
          data: [],
        }),
      );
    }
  };
};
export const updateConfigData = (newConfig = {}) => {
  return async (dispatch, getState) => {
    await dispatch({
      type: UPDATE_DATA_CONFIG,
      payload: newConfig,
    });
  };
};
