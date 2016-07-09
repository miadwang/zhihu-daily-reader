const themeListInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  themes: [],
  isHide: true
};

const themeListReducer = (state=themeListInitialState, action) => {
  switch(action.type) {
    case 'FETCH_THEME_LIST_PENDING': {
      return {...state, fetching: true};
    }
    case 'FETCH_THEME_LIST_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_THEME_LIST_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          themes: action.payload.data.others
      };
    }
    case 'TOGGLE_SIDE_BAR': {
      return {...state,
        isHide: !state.isHide
      };
    }
  }
  return state;
};

export default themeListReducer;
