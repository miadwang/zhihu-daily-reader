import axios from 'axios';

let actions = {
  fetchLatestArticleList: function() {
    return {
      type: 'FETCH_LATEST_ARTICLE_LIST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/latest')
    };
  },
  fetchArticle: function(id) {
    return {
      type: 'FETCH_ARTICLE',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/' + id)
    };
  },
  fetchThemeList: function() {
    return {
      type: 'FETCH_THEME_LIST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/themes')
    };
  }
};

export default actions;
