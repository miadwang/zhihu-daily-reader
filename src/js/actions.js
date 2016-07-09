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
  },
  toggleSideBar: function() {
    return {
      type: 'TOGGLE_SIDE_BAR'
    };
  },
  hideSideBar: function() {
    return {
      type: 'HIDE_SIDE_BAR'
    };
  },
  showArticleDetail: function() {
    return {
      type: 'SHOW_ARTICLE_DETAIL'
    };
  },
  hideArticleDetail: function() {
    return {
      type: 'HIDE_ARTICLE_DETAIL'
    };
  }
};

export default actions;
