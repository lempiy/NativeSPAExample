import {Router} from './router';
import {ListComponent} from './list/list.component';
import {UserComponent} from './user/user.component';
import {listGuard} from './list-guard'
import {app} from './init'

export var APP_ROUTER = new Router(
    app.rootNode,
    [
        {
            path: "",
            redirectTo: "/list"
        },
        {
            id: "List",
            path: "/list",
            component: ListComponent
        },
        {
            id: "User",
            path: "/user/:id",
            component: UserComponent,
            canActivate: listGuard
        }
    ],
    app
)
