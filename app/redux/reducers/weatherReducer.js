const initialState = {
  daily: {
    data: {},
    loading: true,
    isError: false,
  },
  forecast: {
    data: [],
    loading: true,
    isError: false,
  },
  locationData: {
    data: [],
    loading: true,
    isError: false,
  },
  config: {
    temperature: 'C',
    latitude: -6.2293867,
    longitude: 106.6894304,
    locationName: 'Jakarta',
  },
};
export const UPDATE_DATA_DAILY = 'UPDATE_DATA_DAILY';
export const UPDATE_DATA_FORECAST = 'UPDATE_DATA_FORECAST';
export const UPDATE_DATA_LOCATION = 'UPDATE_DATA_LOCATION';
export const UPDATE_DATA_CONFIG = 'UPDATE_DATA_CONFIG';
export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_DATA_DAILY:
      return {
        ...state,
        daily: {
          ...state.daily,
          ...payload,
        },
      };
    case UPDATE_DATA_FORECAST:
      return {
        ...state,
        forecast: {
          ...state.forecast,
          ...payload,
        },
      };
    case UPDATE_DATA_LOCATION:
      return {
        ...state,
        locationData: {
          ...state.locationData,
          ...payload,
        },
      };
    case UPDATE_DATA_CONFIG:
      return {
        ...state,
        config: {
          ...state.config,
          ...payload,
        },
      };
    default:
      return state;
  }
};
