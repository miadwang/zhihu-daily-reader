const latestArticleListInitialState = {
  fetching: false,
  fetched: false,
  date: '',
  topArticles: [],
  articles: [],
  error: null
};

const latestArticleListReducer = (state=latestArticleListInitialState, action) => {
  switch(action.type) {
    case 'FETCH_LATEST_ARTICLE_LIST_PENDING': {
      return {...state, fetching: true};
    }
    case 'FETCH_LATEST_ARTICLE_LIST_REJECTED': {
      return {...state, fetching: false, error: action.payload};
    }
    case 'FETCH_LATEST_ARTICLE_LIST_FULFILLED': {
      return {...state,
          fetching: false,
          fetched: true,
          date: action.payload.data.date,
          topArticles: action.payload.data.top_stories,
          articles: action.payload.data.stories
      };
    }
  }
  return state;
};

export default latestArticleListReducer;
