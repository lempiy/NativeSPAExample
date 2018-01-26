import {APP_ROUTER} from './routing';

export class App {
    constructor(rootNode) {
        this.rootNode = rootNode;
        this._eventMap = {};
    }
    registerEvent(eventName, componentId, elementSelector, callback) {
        if (!this._eventMap[eventName]) {
            this.rootNode.addEventListener(eventName, (e) => {
                this._delegete(e)
            }, true)
            this._eventMap[eventName] = {}
        }
        if (!this._eventMap[eventName][componentId]) {
            this._eventMap[eventName][componentId] = {}
        }
        this._eventMap[eventName][componentId][elementSelector] = callback
    }
    _delegete(event) {
        let target = event.target
        const id = APP_ROUTER.currentRoute.id
        if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
        const eventMap = this._eventMap[event.type][id]
        while(target) {
            if (target === this.rootNode) return
            const key = Object.keys(eventMap).find(key => target.matches(key))
            if (key) {
                eventMap[key](event)
            }
            target = target.parentNode
        }
    }
    clearComponentEvents(id) {
        if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
        this._eventMap[event.type][id] = null
    }
}

