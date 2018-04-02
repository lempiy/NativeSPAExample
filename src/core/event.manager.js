export class EventManager {
    constructor(config) {
        this.rootNode = config.rootNode;
        this.router = config.router;
        this._eventMap = {};
    }
    registerEvent(eventName, componentId, element, callback) {
        if (!this._eventMap[eventName]) {
            this.rootNode.addEventListener(eventName, (e) => {
                this._delegete(e)
            }, true)
            this._eventMap[eventName] = {}
        }
        if (!this._eventMap[eventName][componentId]) {
            this._eventMap[eventName][componentId] = new WeakMap();
        }
        this._eventMap[eventName][componentId].set(element, callback)
    }
    _delegete(event) {
        let target = event.target
        const id = this.router.currentRoute.id
        if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
        const eventMap = this._eventMap[event.type][id]
        while(target) {
            if (target === this.rootNode) return
            let func = eventMap.get(target)
            if (func) {
                func(event)
            }
            target = target.parentNode
        }
    }
    clearComponentEvents(id) {
        if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
        this._eventMap[event.type][id] = null
    }
}