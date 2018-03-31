export class Router {
    constructor(map) {
        this.map = map
    }
    setOutlet(node) {
        this.outlet = node
    }
    setTools(em, templateProvider, parser) {
        this.em = em
        this.templateProvider = templateProvider
        this.parser = parser
    }
    init() {
        if (!this.outlet) throw new Error('No root node provided, call setOutlet(node) before initialication.');
        if (!this.em || !this.templateProvider) throw new Error('No event manager and/or template resolver provided, call setTools(em) before initialication.');
        if (!this.parser) throw new Error('No parser provided, call setTools before initialication.');
        this.hash = window.location.hash;
        this.map.forEach(route => {
            if (route.component) {
                route.instance = new route.component({
                    eventManager: this.em,
                    parser: this.parser,
                    templateProvider: this.templateProvider,
                    id: route.id
                }).toProxy();
            }
            let levels = route.path.split("/")
            if (!levels[0] && levels.length > 1) {
                levels.shift()
            }
            route.levels = levels
            route.params = {}
        })
        window.addEventListener("hashchange", () => {
            this.hash = window.location.hash;
            this.change()
        }, false);
        this.change()
    }
    findRoute() {
        let levels = this.hash.replace(/^\/?#/g, "").split("/")
        if (!levels[0] && levels.length > 1) {
            levels.shift()
        }
        const params = {}
        const r = this.map.find(route => {
            return route.levels.every((pathLvl, i) => {
                if (isParam(pathLvl)) {
                    params[pathLvl.slice(1)] = levels[i] || null
                    return !!levels[i]
                }
                return pathLvl === levels[i]
            })
        })
        if (r) r.params = params;
        return r
    }

    change() {
        let route = this.findRoute()
        if (route) {
            if (route.canActivate && !route.canActivate(route.params)) {
                this.navigate("")
                return false
            }
            if (route.redirectTo) {
                return this.navigate(route.redirectTo)
            }
            if (this.currentRoute) {
                this.currentRoute.instance.destroy(this.outlet)
                this.currentRoute.params = {}
            }
            this.currentRoute = route
            window.scrollY = 0;
            window.document.title = this.currentRoute.id
            route.instance = new route.component({
                eventManager: this.em,
                parser: this.parser,
                templateProvider: this.templateProvider,
                id: route.id
            }).toProxy();
            route.instance.init(this.outlet)
        } else {
            this.navigate("")
        }
    }
    navigate(path) {
        window.location.hash = path
    }
} 

const isParam = level => level[0] === ":"
