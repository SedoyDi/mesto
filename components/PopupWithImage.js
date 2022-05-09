import Popup from "./Popup.js";
import {
  fullScrin,
  fullScrinTitle
} from "../utils/utils.js"

export default class PopupWithImage extends Popup {
  constructor(selector,element){
    super (selector)
    this._element = element;
  }
  open = () => {
    this._popupSelector.classList.add('popup_opened');
    fullScrin.src = this._element.link;
    fullScrin.alt = this._element.name;
    fullScrinTitle.textContent = this._element.name;
  }
}
