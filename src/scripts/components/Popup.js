export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close-button');
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
   this._popup.classList.add('popup_opened');
   document.addEventListener('keydown', this._handleEscClose);
  }
  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners(){
    this._closeButton.addEventListener('click',() =>{
      this.close()
    });
    this._popup.addEventListener('mousedown', this._closeByClick);
  }
}