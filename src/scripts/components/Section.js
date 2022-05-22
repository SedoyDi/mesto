export default class Section {
  constructor ({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._selector = containerSelector;
  };

  renderItems() {
    this._items.forEach((el) => this._renderer(el));
  };

  addItems(el) {
    this._selector.append(el)
  };
};