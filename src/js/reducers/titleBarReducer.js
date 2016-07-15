const titleBarInitialState = {
  theme: '今日热文',
  themeId: 0,
  themeImage: '',
  backgroundOpacity: 0
};

const titleBarReducer = (state=titleBarInitialState, action) => {
  switch(action.type) {
    case 'CHANGE_TITLE': {
      return {...state, theme: action.payload.theme, themeId: action.payload.themeId, themeImage: action.payload.themeImage};
    }
    case 'CHANGE_OPACITY': {
      return {...state, backgroundOpacity: action.payload}
    }
  }
  return state;
};

export default titleBarReducer;
