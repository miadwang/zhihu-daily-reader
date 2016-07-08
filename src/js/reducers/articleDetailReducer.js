const articleInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  body: ''
};

const latestDetailReducer = (state=articleInitialState, action) => {
  switch(action.type) {
    case 'FETCH_ARTICLE_DETAIL_PENDING': {
      return {...state, fetching: true};
    }
    case 'FETCH_ARTICLE_DETAIL_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_ARTICLE_DETAIL_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          body: action.payload.data.body
      };
    }
  }
  return state;
};

export default latestDetailReducer;
