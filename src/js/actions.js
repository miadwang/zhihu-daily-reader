import axios from 'axios';

let actions = {
  fetchLatestArticleList: function() {
    return {
      type: 'FETCH_LATEST_ARTICLE_LIST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/latest')
    };
  },
  fetchArticleDetail: function(id) {
    return {
      type: 'FETCH_ARTICLE_DETAIL',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/' + id)
    };
  },
  fetchThemeList: function() {
    return {
      type: 'FETCH_THEME_LIST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/themes')
    };
  },
  fetchThemeArticleList: function(id) {
    return {
      type: 'FETCH_THEME_ARTICLE_LIST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/theme/' + id)
    };
  }
};

export default actions;
