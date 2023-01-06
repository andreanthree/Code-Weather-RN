const initialState = {
  data: {
    id: '',
    name: '',
    email: '',
    address: '',
  },
};
export const UPDATE_DATA_USER = 'UPDATE_DATA_USER';
export default (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case UPDATE_DATA_USER:
      return {
        ...state,
        data: {
          ...state.data,
          ...payload,
        },
      };
    default:
      return state;
  }
};
