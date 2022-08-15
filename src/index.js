import { refs } from './refs';
import { createMarkup, clearMarkup } from './markup';
import { fetchRequest, toLoadMore } from './request';
import { onSuccess, onError } from './helpers';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { PAGE } from './service';

const { formRef, loadMoreBtn } = refs;

loadMoreBtn.style.display = 'none';

export async function onSubmit(event) {
  event.preventDefault();

  clearMarkup();

  const value = event.target.elements.searchQuery.value.trim();

  if (!value) return;

  const response = await fetchRequest(value);
  if (response.data.hits.length === 0) {
    loadMoreBtn.style.display = 'none';
    return onError();
  } else {
    createMarkup(response.data.hits);
    loadMoreBtn.style.display = 'block';
    onSuccess(response.data.totalHits);
    lightbox.refresh();
  }

  PAGE.value = 1;
  createMarkup(response.data.hits);
  //   console.dir(event.target.elements.searchQuery.value);
}

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
  captionsData: 'alt',
  showCounter: false,
});

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', toLoadMore);
