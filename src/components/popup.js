export default class Popup {
  constructor(options) {
    this.options = options;
  }
  open(event) {
    this.options.popup.classList.add('popup_is-opened');
    this.options.button.setAttribute('disabled', true);
  }

  close(event) {
    this.options.popup.classList.remove('popup_is-opened');
    this.options.button.removeAttribute('disabled');
  }
}
