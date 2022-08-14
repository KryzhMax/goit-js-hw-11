const axios = require('axios');
import { BASE_URL, KEY, QUERY_PARAMS, PAGE } from '../service';
import { refs } from '../refs';
const { formRef, loadMoreBtn } = refs;
import { onEnd } from '../helpers';
import { createMarkup } from '../markup';

export async function fetchRequest(request) {
  try {
    const url = `${BASE_URL}?key=${KEY}&q=${request}&${QUERY_PARAMS}&${PAGE}`;
    const response = await axios.get(url);
    // console.log(response);
    return response;
  } catch (error) {
    onError();
  }
}

export function pageReset() {
  return (PAGE = 1);
}

export function incPage() {
  return (PAGE += 1);
}

export async function toLoadMore(event) {
  incPage();

  const response = await fetchRequest(formRef[0].value);
  debugger;
  createMarkup(response.data.hits);

  if (PAGE >= Math.floor(response.data.totalHits / 40)) {
    console.dir(loadMoreBtn);
    loadMoreBtn.style.display = 'none';
    onEnd();
  }
}
