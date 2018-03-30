export class Detector {
    static proxy(context) {
        return new Proxy(context, context.getContextHandler())
    }
}

const getHandler = (ctx, rootName) => ({
    get: (target, name) => {
        if(name in target) {
            return name[target]
        }
        if(ctx[name] !== undefined) {
            return ctx[name]
        }
        return undefined
    },
    set: (target, name, value) => {
        if (typeof value === "object") {
            target[name] = new Proxy(value, getHandler(ctx, rootName))
        } else {
            target[name] = value
        }
        ctx._change(target, rootName, value)
        return true
    }
})

export class Context {
    constructor(parent, parser) {
        this._parent = parent;
        this._childs = [];
        this._resolvers = {};
        const self = this;
        this._handler = {
            get: (target, name) => {
                if(name in target) {
                    return target[name]
                }
                if(this._parent && this._parent[name] !== undefined) {
                    return this._parent[name]
                }
                return undefined
            },
            set: (target, name, value) => {
                console.log(target, name, value)
                if (typeof value === "object") {
                    target[name] = new Proxy(value, getHandler(self, name))
                } else {
                    target[name] = value
                }
                self._change(target, name, value)
                return true
            }
        }
    }

    getContextHandler() {
        return this._handler
    }

    _bindView(propName, resolver) {
        this._resolvers[propName] = this._resolvers[propName] ? 
        this._resolvers[propName].concat([resolver]) : 
        [resolver];
    }

    _change(target, name, value) {
        if (this._resolvers[name]) {
            this._resolvers[name].forEach(resolver => {
                resolver(name)
            })
        }
        this._childs.forEach(c => {
            c._change(target, name, value)
        });
    }
}
