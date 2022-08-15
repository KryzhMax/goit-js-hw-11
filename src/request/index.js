const axios = require('axios');
import { BASE_URL, KEY, QUERY_PARAMS, PAGE } from '../service';
import { refs } from '../refs';
const { formRef, loadMoreBtn } = refs;
import { onEnd, onError } from '../helpers';
import { createMarkup } from '../markup';
import { lightbox } from '../';

let value = '';

export async function fetchRequest(request) {
  try {
    const url = `${BASE_URL}?key=${KEY}&q=${request}&${QUERY_PARAMS}&page=${PAGE.value}`;
    const response = await axios.get(url);
    // console.log(response);
    return response;
  } catch (error) {
    onError();
  }
}

export async function toLoadMore(event) {
  PAGE.value += 1;
  const response = await fetchRequest(formRef[0].value);
  console.log('test 1111', response.data.hits.length);

  if (response.data.hits.length < 40) {
    loadMoreBtn.disabled = true;
    createMarkup(response.data.hits);
    if (galleryRef.children.length === response.data.totalHits) {
      loadMoreBtn.disabled = true;
      lightbox.refresh();
      return onEnd();
    }
    lightbox.refresh();
    return onEnd();
  }
}
