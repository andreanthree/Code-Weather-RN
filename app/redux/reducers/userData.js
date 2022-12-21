const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_USERDATA':
      return {
        ...state,
        data: {}
      };
    case 'STORING_USERDATA':
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};
