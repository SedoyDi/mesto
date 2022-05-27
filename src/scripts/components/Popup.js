export default class Popup {
  constructor (selector) {
    this._popupSelector = selector;
    this._closeButton = this._popupSelector.querySelector('.popup__close-button');
  }

  _closeByClick = (el) => {
    if (!el.target.closest('.popup-content')){
        this.close();
      }
  }
  _handleEscClose = (evt) => {
    if(evt.key === 'Escape'){
        this.close();
  }
  }
  open() {
   this._popupSelector.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners(){
    this._closeButton.addEventListener('click',() =>{
      this.close()
    });
    this._popupSelector.addEventListener('click', this._closeByClick);
  }
}