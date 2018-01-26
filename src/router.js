/*
map = [
    {
        path: 'any',
        component: Component,
        id: ComponentId:string,
        canActivate: function(params):boolean
    }
]
*/
export class Router {
    constructor(outlet, map) {
        this.outlet = outlet
        this.map = map
    }
    map
    hash
    currentRoute
    outlet
    init() {
        this.hash = window.location.hash;
        this.map.forEach(route => {
            if (route.component) {
                route.component = new route.component(
                    document.querySelector('#'+route.id)
                )
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
                this.currentRoute.component.destroy(this.outlet)
                this.currentRoute.params = {}
            }
            this.currentRoute = route
            window.document.title = this.currentRoute.id
            route.component.init(this.outlet)
        } else {
            this.navigate("")
        }
    }
    navigate(path) {
        window.location.hash = path
    }
} 

const isParam = level => level[0] === ":"
