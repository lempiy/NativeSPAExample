export function Component(conf) {
    this.template = conf.template
    this.mounted = false
    this._app = conf.app
    this.id = conf.id
}

Component.prototype.beforeInit = function(){}
Component.prototype.onInit = function(){}

Component.prototype.onEvent = function(eventName, selector, callback){
    this._app.registerEvent(eventName, this.id, selector, callback)
}

Component.prototype.init = function(baseNode){
    this.beforeInit()
    var clone = document.importNode(this.template.content, true);
    baseNode.append(clone);
    return this.onInit()
}

Component.prototype.destroy = function(baseNode){
    baseNode.innerHTML = ""
    this._app.clearComponentEvents(this.id)
    return this.onDestroy && this.onDestroy()
}
