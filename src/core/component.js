
import {Context} from './change.detection';

export class Component extends Context {
    template
    mounted
    constructor(conf) {
        super(conf.parent)
        this.templateProvider = conf.templateProvider
        this.parser = conf.parser
        this.template = this.templateProvider.getTemplate(conf.tag)
        this.mounted = false
        this._eventManager = conf.eventManager
        this.id = conf.id
        this.imports = conf.imports
    }

    beforeInit() {}
    onInit() {}

    extractMatches() {}

    onEvent(eventName, selector, callback) {
        this._eventManager.registerEvent(eventName, this.id, selector, callback)
    }

    init(baseNode) {
        this.beforeInit()
        let main = document.createElement(this.template.tagName);
        let clone = document.importNode(this.template.firstElementChild.content, true);
        main.append(clone);
        this.parser.parse(this, main);
        baseNode.append(main)
        return this.onInit()
    }

    destroy(baseNode) {
        baseNode.removeChild(baseNode.firstElementChild)
        this._eventManager.clearComponentEvents(this.id)
        this.clearContext()
        return this.onDestroy && this.onDestroy()
    }
}
