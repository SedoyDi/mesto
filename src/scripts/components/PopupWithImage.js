import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  static fullScrin = document.querySelector('.popup__max-img');
  static fullScrinTitle = document.querySelector('.popup__max-img-title');
  constructor(selector){
    super (selector)
  }
  open(element) {
    super.open();
    PopupWithImage.fullScrin.src = element.link;
    PopupWithImage.fullScrin.alt = element.name;
    PopupWithImage.fullScrinTitle.textContent = element.name;
  }
}
