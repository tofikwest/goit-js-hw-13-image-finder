import './sass/main.scss';
import ApiServices from './apiService';
import articlesTpl from './templates/articles.hbs';
const debounce = require('lodash.debounce')

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('#loadMore'),
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500))
refs.loadMore.addEventListener('click', onLoadMore)

const apiServices = new ApiServices();

function onSearch (e) {
  apiServices.query = e.target.value;
  apiServices.resetPage()
  apiServices.searchPhoto().then(markUpArticles)
  const element = document.getElementById('loadMore');
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  
}

function onLoadMore() {
  apiServices.searchPhoto().then(markUpArticles)
  const element = document.querySelector('.gallery').lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
  
}

function markUpArticles (article) {
  refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(article))
}