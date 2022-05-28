export default class Section {
  constructor (renderer, containerSelector){
    this._items = [];
    this._renderer = renderer;
    this._selector = containerSelector;
  };
setItems(data){
  this._items = data
}
  renderItems() {
    this._items.forEach((el) => this._renderer(el));
  };

  addItems(el) {
    this._selector.append(el)
  };
};