export class Component {
    template
    mounted
    constructor(conf) {
        this.template = conf.template
        this.mounted = false
        this._app = conf.app
        this.id = conf.id
    }

    beforeInit() {}
    onInit() {}

    extractMatches() {}

    onEvent(eventName, selector, callback) {
        this._app.registerEvent(eventName, this.id, selector, callback)
    }

    init(baseNode) {
        this.beforeInit()
        let clone = document.importNode(this.template.content, true);
        baseNode.append(clone);
        return this.onInit()
    }

    destroy(baseNode) {
        baseNode.innerHTML = ""
        this._app.clearComponentEvents(this.id)
        return this.onDestroy && this.onDestroy()
    }
}
