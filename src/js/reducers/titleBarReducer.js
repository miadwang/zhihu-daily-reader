const titleBarInitialState = {
  theme: '今日热文',
  themeId: 0
};

const titleBarReducer = (state=titleBarInitialState, action) => {
  switch(action.type) {
    case 'CHANGE_TITLE': {
      return {theme: action.payload.theme, themeId: action.payload.themeId};
    }
  }
  return state;
};

export default titleBarReducer;
