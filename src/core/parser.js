import resolvers from './syntax-resolvers';

export class Parser {
    constructor(eventManager, templateProvider) {
        this.eventManager = eventManager;
        this.templateProvider = templateProvider;
        this.resolvers = resolvers.map(Resolver => new Resolver(this)).reduce((acc,resolver) => {
            acc[resolver.syntaxAttr] = resolver;
            return acc
        } ,{})
        this.resolverKeys = Object.keys(this.resolvers);
    }

    parse(component, element) {
        Array.from(element.children).forEach(child => {
            let resolvers = this._findResolvers(child);
            resolvers.forEach(resolver => {
                resolver.resolve(component, child);
            })
            
            if (child.children.length) this.parse(component, child);
        })
    }

    _findResolvers(element) {
        return this.resolverKeys.filter(key => element.hasAttribute(key))
            .map(key => this.resolvers[key])
    }
}