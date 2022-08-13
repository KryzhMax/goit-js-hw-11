import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function onSuccess(totalHits) {
  Notify.success(`Hooray! We found ${totalHits} images.`);
}
export function onError() {
  Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

export function onEnd() {
  Notify.failure("We're sorry, but you've reached the end of search results.");
}
