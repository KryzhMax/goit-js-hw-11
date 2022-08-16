import { refs } from './refs';
import { createMarkup, clearMarkup } from './markup';
import { fetchRequest, toLoadMore } from './request';
import { onSuccess, onError, onEnd } from './helpers';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PAGE } from './service';

const { formRef, btnRef, galleryRef, loadMoreBtn } = refs;

loadMoreBtn.disabled = true;

export async function onSubmit(event) {
  event.preventDefault();

  clearMarkup();

  const value = event.target.elements.searchQuery.value.trim();

  if (!value) return;
  PAGE.value = 1;

  const response = await fetchRequest(value);
  if (!response.data.hits.length) {
    loadMoreBtn.disabled = true;
    return onError();
  }
  if (response.data.totalHits < 40) {
    loadMoreBtn.disabled = true;
    onEnd();
  }
  loadMoreBtn.disabled = false;
  onSuccess(response.data.totalHits);
  createMarkup(response.data.hits);
  lightbox.refresh();

}

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
  captionsData: 'alt',
  showCounter: false,
});

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', toLoadMore);
