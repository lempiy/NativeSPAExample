import {Router} from './core/router';
import {ListComponent} from './components/list/list.component';
import {UserComponent} from './components/user/user.component';
import {listGuard} from './list-guard'

export const APP_ROUTER = new Router(
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
    ]
)
