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
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
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

export function hideSearchBtn() {
  console.dir(loadMoreBtn);
  loadMoreBtn.classList.toggle('is-hidden');
}
