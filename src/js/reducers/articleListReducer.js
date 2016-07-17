const articleListInitialState = {
  fetching: false,
  fetched: false,
  error: null,
  date: '',
  topArticleItems: [],
  articleItems: [],
  editors: []
};

const articleListReducer = (state=articleListInitialState, action) => {
  switch(action.type) {
    case 'FETCH_LATEST_ARTICLE_LIST_PENDING': {
      return {...state, fetching: true, fetched: false, error: null, editors: []};
    }
    case 'FETCH_LATEST_ARTICLE_LIST_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_LATEST_ARTICLE_LIST_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          date: action.payload.data.date,
          topArticleItems: action.payload.data.top_stories,
          articleItems: action.payload.data.stories
      };
    }
    case 'FETCH_THEME_ARTICLE_LIST_PENDING': {
      return {...state, fetching: true, fetched: false, error: null};
    }
    case 'FETCH_THEME_ARTICLE_LIST_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_THEME_ARTICLE_LIST_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          articleItems: action.payload.data.stories,
          topArticleItems: [],
          editors: action.payload.data.editors
      };
    }
  }
  return state;
};

export default articleListReducer;
