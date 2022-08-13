import { refs } from './refs';
import { createMarkup, clearMarkup } from './markup';
import { fetchRequest, pageReset } from './request';
import { onSuccess, onError, onEnd } from './helpers';

const { formRef, btnRef, galleryRef } = refs;
// fetchRequest()
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

export async function onSubmit(event) {
  event.preventDefault();
  //   clearMarkup();
  galleryRef.innerHTML = '';
  const value = event.target.elements.searchQuery.value.trim();
  if (value === '') {
    return onError();
  }

  if (!value) return;

  pageReset();

  try {
    const response = await fetchRequest(value);
    createMarkup();
  } catch (error) {
    console.log(error);
  }
  //   console.dir(event.target.elements.searchQuery.value);
}
formRef.addEventListener('submit', onSubmit);
