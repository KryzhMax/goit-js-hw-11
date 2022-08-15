const axios = require('axios');
import { BASE_URL, KEY, QUERY_PARAMS, PAGE } from '../service';
import { refs } from '../refs';
const { formRef, loadMoreBtn } = refs;
import { onEnd } from '../helpers';
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
    loadMoreBtn.style.display = 'none';
    createMarkup(response.data.hits);
    lightbox.refresh();
    return onEnd();
  }
  createMarkup(response.data.hits);
}
