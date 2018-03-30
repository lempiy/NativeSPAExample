export class TemplateProvider {
    constructor(selector) {
        this.templateHolder = document.querySelector(selector);
        this._memo = {};
    }
    getTemplate(tag) {
        if (this._memo[tag]) return this._memo[tag]; 
        if (!this.templateHolder.content.children.length) throw new Error(`No component <${tag}> templates found`);
        let node = Array.from(this.templateHolder.content.children).find(element => element.tagName.toUpperCase() === tag.toUpperCase())
        if (!node) throw new Error(`No component <${tag}> templates found`);
        return node
    }
}
