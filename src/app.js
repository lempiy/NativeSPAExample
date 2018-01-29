import {APP_ROUTER} from './routing';

export function App(rootNode) {
    this.rootNode = rootNode;
    this._eventMap = {};
}

App.prototype.registerEvent = function(eventName, componentId, elementSelector, callback) {
    if (!this._eventMap[eventName]) {
        var self = this
        this.rootNode.addEventListener(eventName, function (e) {
            self._delegete(e)
        }, true)
        this._eventMap[eventName] = {}
    }
    if (!this._eventMap[eventName][componentId]) {
        this._eventMap[eventName][componentId] = {}
    }
    this._eventMap[eventName][componentId][elementSelector] = callback
}

App.prototype._delegete = function(event) {
    var target = event.target
    var id = APP_ROUTER.currentRoute.id
    if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
    var eventMap = this._eventMap[event.type][id]
    while(target) {
        if (target === this.rootNode) return
        var key = Object.keys(eventMap).find(function(key) {
            return target.matches(key)
        })
        if (key) {
            eventMap[key](event)
        }
        target = target.parentNode
    }
}

App.prototype.clearComponentEvents = function(id) {
    if (!id || !this._eventMap[event.type] || !this._eventMap[event.type][id]) return
    this._eventMap[event.type][id] = null
}
