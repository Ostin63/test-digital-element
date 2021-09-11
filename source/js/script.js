/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
const body = document.querySelector('.body');
const clientButtons = body.querySelectorAll('.beloved-client__item');
const buttonLink = body.querySelector('.footer__link');
const modal = body.querySelector('.modal');
const overlay = body.querySelector('.overlay');
const form = modal.querySelector('.modal__form');
const formInputName = modal.querySelector('.modal__form-input--name');
const formInputMail = modal.querySelector('.modal__form-input--mail');
const formtextarea = modal.querySelector('.modal__form-input--textarea');

const dataUrl = 'https://echo.htmlacademy.ru/';

const getTemplateContent = (block, item) =>
  block.querySelector(`#${item}`)
    .content
    .querySelector(`.${item}`);

const success = getTemplateContent(body, 'alert__success');
const errorLoading = getTemplateContent(body, 'alert__error-loading');

const successElement = success.cloneNode(true);
const successErrorLoading = errorLoading.cloneNode(true);

const sendData = (url, bodyForm, alertSuccess, alertError) => {
  fetch(url, {
    method: 'POST',
    body: bodyForm,
  })
    .then((response) => {
      if (response.ok) {
        alertSuccess();
      } else {
        alertError();
      }
    })
    .catch(() => {
      alertError();
    });
};

const onErrorRemove = () => {
  successErrorLoading.remove();
  document.removeEventListener('click', onErrorRemove);
};

const onAddModal = (evt) => {
  evt.preventDefault();

  modal.classList.add('active');
  overlay.classList.add('active');
  body.classList.add('hidden');
};

const onRemoveModal = () => {
  modal.classList.remove('active');
  overlay.classList.remove('active');
  body.classList.remove('hidden');
};

const alertError = () => {
  onRemoveModal();
  body.append(successErrorLoading);
  document.addEventListener('click', onErrorRemove);
};

const onSuccessRemove = () => {
  successElement.remove();
  document.removeEventListener('click', onSuccessRemove);
};

const alertSuccess = () => {
  body.append(successElement);
  document.addEventListener('click', onSuccessRemove);
  onRemoveModal();
};


const resetForm = () => {
  formInputName.value = '';
  formInputMail.value = '';
  formtextarea.value = '';
};


const alert = () => {
  alertSuccess();
  resetForm();
};

const onFormSend = (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(dataUrl, formData, alert, alertError);
};

const switchButton = (buttons) => {
  for (let button of buttons) {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      for (let button of buttons) {
        button.classList.remove('active');
      }

      button.classList.add('active');
    });
  }
};

buttonLink.addEventListener('click', onAddModal);
overlay.addEventListener('click', onRemoveModal);
form.addEventListener('submit', onFormSend);
switchButton(clientButtons);
