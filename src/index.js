import './sass/main.scss';
import ApiServices from './apiService';
import articlesTpl from './templates/articles.hbs';
const debounce = require('lodash.debounce')

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('#loadMore'),
  btnSubmit: document.querySelector('#btnSubmit'),
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMore.addEventListener('click', onLoadMore)
refs.loadMore.style.display = 'none'

const apiServices = new ApiServices();

function onSearch (e) {
  e.preventDefault();
  apiServices.query = e.currentTarget.elements.query.value;
  apiServices.resetPage()
  clearPage()
  apiServices.searchPhoto().then(markUpArticles, onLoadMore).catch(error);
  refs.loadMore.style.display = 'block'

}
function clearPage() {
  refs.gallery.innerHTML = '';
}

function onLoadMore() {
  apiServices.searchPhoto().then(markUpArticles)
  setTimeout(() => {
    const element = document.querySelector('.gallery').lastElementChild;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, 500);
}

function markUpArticles (article) {
  refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(article))
}