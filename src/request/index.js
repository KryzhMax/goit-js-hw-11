const axios = require('axios');
import { BASE_URL, KEY, QUERY_PARAMS, PAGE } from '../service';
import { refs } from '../refs';
const { formRef, galleryRef, loadMoreBtn } = refs;
import { onEnd, onError } from '../helpers';
import { createMarkup } from '../markup';
import { lightbox } from '../';

let value = '';

export async function fetchRequest(request) {
  try {
    const url = `${BASE_URL}?key=${KEY}&q=${request}&${QUERY_PARAMS}&page=${PAGE.value}`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    throw new Error();
  }
}

export async function toLoadMore(event) {
  try {
    PAGE.value += 1;
    const response = await fetchRequest(formRef[0].value);
    console.log('test 1111', response?.data?.hits?.length);
    console.log(galleryRef.children.length);

    if (galleryRef.children.length >= response.data.totalHits) {
      loadMoreBtn.disabled = true;
      return onEnd();
    }
    createMarkup(response.data.hits);
    lightbox.refresh();
  } catch (error) {
    loadMoreBtn.disabled = true;
    return onEnd();
  }
}
