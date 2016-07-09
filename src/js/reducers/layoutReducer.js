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
    case 'HIDE_SIDE_BAR': {
      return {...state,
        sideBarIsActive: false
      };
    }
    case 'SHOW_ARTICLE_DETAIL': {
      return {...state,
        articleDetailIsActive: true
      };
    }
    case 'HIDE_ARTICLE_DETAIL': {
      return {...state,
        articleDetailIsActive: false
      };
    }
  }
  return state;
};

export default layoutReducer;
