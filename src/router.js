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
export function Router(outlet, map, app) {
    this.outlet = outlet
    this.map = map
    this.app = app
}

Router.prototype.init = function() {
    this.hash = window.location.hash;
    var self = this;
    this.map.forEach(function(route) {
        if (route.component) {
            route.component = new route.component({
                template: document.querySelector('#'+route.id), 
                app: self.app, 
                id: route.id
            })
        }
        var levels = route.path.split("/")
        if (!levels[0] && levels.length > 1) {
            levels.shift()
        }
        route.levels = levels
        route.params = {}
    })
    window.addEventListener("hashchange", function() {
        self.hash = window.location.hash;
        self.change()
    }, false);
    this.change()
}

Router.prototype.findRoute = function() {
    var levels = this.hash.replace(/^\/?#/g, "").split("/")
    if (!levels[0] && levels.length > 1) {
        levels.shift()
    }
    var params = {}
    var r = this.map.find(function(route) {
        return route.levels.every(function(pathLvl, i) {
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

Router.prototype.change = function() {
    var route = this.findRoute()
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

Router.prototype.navigate = function(path) {
    window.location.hash = path
}

function isParam(level) {
    return level[0] === ":"
}
