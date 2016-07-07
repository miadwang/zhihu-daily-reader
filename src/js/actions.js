import axios from 'axios';

let actions = {
  fetchLatest: function() {
    return {
      type: 'FETCH_LATEST',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/latest')
    };
  },
  fetchArticle: function(id) {
    return {
      type: 'FETCH_ARTICLE',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/news/' + id)
    };
  },
  fetchThemes: function() {
    return {
      type: 'FETCH_THEMES',
      payload: axios.get('http://zhihudaily.leanapp.cn/api/4/themes')
    };
  }
};

export default actions;
