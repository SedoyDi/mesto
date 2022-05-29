export default class Section {
  constructor (renderer, container){
    this._items = [];
    this._renderer = renderer;
    this._container = container;
  };
  setItems(data){
    this._items = data
  }
  renderItems() {
    this._items.forEach((el) => this._renderer(el));
  };
  prependItems(el) {
    this._container.prepend(el)
  };
  appendItems(el) {
    this._container.append(el)
  };
};