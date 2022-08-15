import { refs } from './refs';
import { createMarkup, clearMarkup, hideSearchBtn } from './markup';
import { fetchRequest, pageReset, toLoadMore, incPage } from './request';
import { onSuccess, onError, onEnd } from './helpers';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PAGE } from './service';

const { formRef, btnRef, galleryRef, loadMoreBtn } = refs;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
  captionsData: 'alt',
  showCounter: false,
});

export async function onSubmit(event) {
  event.preventDefault();

  clearMarkup();

  const value = event.target.elements.searchQuery.value.trim();

  if (!value) return;

  if (value === '') {
    return onError();
  }

  PAGE.value = 1;

  const response = await fetchRequest(value);
  createMarkup(response.data.hits);

  //   console.dir(event.target.elements.searchQuery.value);
}
formRef.addEventListener('submit', onSubmit);
btnRef.addEventListener('click', hideSearchBtn);
loadMoreBtn.addEventListener('click', toLoadMore);
