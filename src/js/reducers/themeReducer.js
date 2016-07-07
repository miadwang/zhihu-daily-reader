const themeInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  themes: []
};

const themeReducer = (state=themeInitialState, action) => {
  switch(action.type) {
    case 'FETCH_THEMES_PENDING': {
      return {...state, fetching: true};
    }
    case 'FETCH_THEMES_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_THEMES_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          themes: action.payload.data.others
      };
    }
  }
  return state;
};

export default themeReducer;
