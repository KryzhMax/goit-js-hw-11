import { refs } from '../refs';

const { galleryRef, loadMoreBtn } = refs;

export function createMarkup(hits = []) {
  const markup = hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card card-set-item">
      <a class="photo-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b></br> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b></br> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b></br> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b></br> ${downloads}
    </p>
  </div>
    </a>
</div>`;
      }
    )
    .join('');
  return galleryRef.insertAdjacentHTML('beforeend', markup);
}

export function clearMarkup() {
  galleryRef.innerHTML = '';
}
