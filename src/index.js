import { refs } from './refs';
import { createMarkup, clearMarkup, hideSearchBtn } from './markup';
import { fetchRequest, pageReset, toLoadMore, incPage } from './request';
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

  const response = await fetchRequest(value);
  if (response.data.hits.length === 0) {
    loadMoreBtn.disabled = true;
    return onError();
  } else if (response.data.hits.length < 40) {
    loadMoreBtn.disabled = true;
    createMarkup(response.data.hits);
    if (galleryRef.children.length === response.data.totalHits) {
      loadMoreBtn.disabled = true;
      lightbox.refresh();
      return onEnd();
    }
    lightbox.refresh();
    return onEnd();
  } else {
    createMarkup(response.data.hits);
    loadMoreBtn.disabled = false;
    onSuccess(response.data.totalHits);
    lightbox.refresh();
  }

  PAGE.value = 1;

  //   console.dir(event.target.elements.searchQuery.value);
}

export const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: '250',
  captionsData: 'alt',
  showCounter: false,
});

formRef.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', toLoadMore);
