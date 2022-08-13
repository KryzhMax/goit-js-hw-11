const axios = require('axios');
import { BASE_URL, KEY, QUERY_PARAMS, PAGE } from '../service';

export async function fetchRequest(request) {
  const url = `${BASE_URL}?key=${KEY}&q=${request}&${QUERY_PARAMS}&${PAGE}`;
  const response = await axios.get(url);
  PAGE += 1;
  console.log(response);
  return response;
}

export function pageReset() {
  PAGE = 1;
}
