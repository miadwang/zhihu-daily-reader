const themeInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  themeList: []
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
          themeList: action.payload.data.others
      };
    }
  }
  return state;
};

export default themeReducer;
