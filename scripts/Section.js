export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this.__containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach((item) =>{
            this._renderer(item);
        });
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
}