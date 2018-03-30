import resolvers from './syntax-resolvers';

export class Parser {
    constructor(eventManager, templateProvider) {
        this.eventManager = eventManager;
        this.templateProvider = templateProvider;
        console.log(resolvers)
        this.resolvers = resolvers.map(Resolver => new Resolver(this)).reduce((acc,resolver) => {
            acc[resolver.syntaxAttr] = resolver;
            return acc
        } ,{})
        this.resolverKeys = Object.keys(this.resolvers);
    }

    parse(component, element) {
        Array.from(element.children).forEach(child => {
            let resolver = this._findResolver(child);
            if (resolver) resolver.resolve(component, child);
            
            if (child.children.length) this.parse(component, child);
        })
    }

    _findResolver(element) {
        let key = this.resolverKeys.find(key => element.hasAttribute(key))
        
        if (key) {
            return this.resolvers[key]
        }
        return null
    }
}