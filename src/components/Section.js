export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this.renderer = renderer;
        this._containerSelector = containerSelector;
    }

    renderItems() {
        this._items.forEach((item) =>{
            this.renderer(item);
        });
    }

    addItem(element) {
        this._containerSelector.prepend(element);
    }
}