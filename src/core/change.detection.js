export class Context {
    constructor(parent, parser) {
        this._parent = parent;
        this._childs = [];
        this._resolvers = {};
    }

    getHandler(rootProp) {
        let self = this;
        return {
            get(target, property, receiver) {
                try {
                    if (typeof target[property] === "function") {
                        let val = Reflect.get(target, property, receiver)
                        val = val.bind(target);
                        return val
                    }
                    if (
                        target[property] instanceof Element
                    ) return target[property];
                    return new Proxy(target[property], self.getHandler(rootProp || property));
                } catch (err) {
                    
                    return Reflect.get(target, property, receiver)
                }
            },
            defineProperty(target, property, descriptor) {
                Reflect.defineProperty(target, property, descriptor);
                self._change(target, rootProp || property);
                return true
            },
            deleteProperty(target, property) {
                Reflect.deleteProperty(target, property);
                self._change(target, rootProp || property);
                return true
            }
        }
    }

    toProxy() {
        return new Proxy(this, this.getHandler());
    }

    addChildContext(ctx) {
        this._childs.push(ctx)
    }

    removeChildContext(ctx) {
        let index = this._childs.findIndex(cx === ctx)
        if (index === -1) return
        this._childs.splice(index, 1)
    }

    clearContext() {
        this._childs = [];
        this._resolvers = {};
    }

    _bindView(propName, resolver) {        
        this._resolvers[propName] = this._resolvers[propName] ? 
        [resolver].concat(this._resolvers[propName]) : 
        [resolver];
    }

    _change(target, name, value) {
        if (this._resolvers[name]) {
            console.log(this._resolvers)
            this._resolvers[name].forEach(resolver => {
                resolver(name)
            })
        }
        this._childs.forEach(c => {
            c._change(target, name, value)
        });
    }
}
