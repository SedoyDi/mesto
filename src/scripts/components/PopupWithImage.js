import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  static fullScrin = document.querySelector('.popup__max-img');
  static fullScrinTitle = document.querySelector('.popup__max-img-title');
  constructor(selector,element){
    super (selector)
    this._element = element;
  }
  open = () => {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    PopupWithImage.fullScrin.src = this._element.link;
    PopupWithImage.fullScrin.alt = this._element.name;
    PopupWithImage.fullScrinTitle.textContent = this._element.name;
  }
}
