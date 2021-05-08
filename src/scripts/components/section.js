export default class Section {
    constructor({renderer}, containerSelector) {
        // this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.append(element);
    }

    newAddItem(element) {
        this._container.prepend(element);
    }

    renderItems(items) {
        items.forEach(item => {
            this.addItem(this._renderer(item))
        });
        
    }
}
