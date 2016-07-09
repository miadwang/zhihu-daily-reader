const articleInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  body: '',
  css: [],
  img: '',
  imgSource: ''
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
          body: action.payload.data.body,
          css: action.payload.data.css,
          img: action.payload.data.image,
          imgSource: action.payload.data.image_source
      };
    }
  }
  return state;
};

export default latestDetailReducer;
