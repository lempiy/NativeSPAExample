export class Component {
    template
    mounted
    constructor(template) {
        this.template = template
        this.mounted = false
    }

    beforeInit() {}
    onInit() {}

    extractMatches() {}

    init(baseNode) {
        this.beforeInit()
        let clone = document.importNode(this.template.content, true);
        baseNode.append(clone);
        return this.onInit()
    }

    destroy(baseNode) {
        baseNode.innerHTML = ""
        return this.onDestroy && this.onDestroy()
    }
}
