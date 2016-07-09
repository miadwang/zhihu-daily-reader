const layoutInitialState = {
  sideBarIsActive: false,
  articleDetailIsActive: false
};

const layoutReducer = (state=layoutInitialState, action) => {
  switch(action.type) {
    case 'TOGGLE_SIDE_BAR': {
      return {...state,
        sideBarIsActive: !state.sideBarIsActive
      };
    }
    case 'TOGGLE_ARTICLE_DETAIL': {
      return {...state,
        articleDetailIsActive: !state.articleDetailIsActive
      };
    }
  }
  return state;
};

export default layoutReducer;
