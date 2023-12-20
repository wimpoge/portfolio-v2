// src/redux/themeReducer.js
const SET_THEME = 'SET_THEME';

export const setTheme = (theme) => ({
  type: SET_THEME,
  payload: theme,
});

const themeReducer = (state = 'light', action) => {
  switch (action.type) {
    case SET_THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
