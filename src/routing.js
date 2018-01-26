import {Router} from './router';
import {ListComponent} from './list/list.component';
import {UserComponent} from './user/user.component';
import {listGuard} from './list-guard'

export const APP_ROUTER = new Router(
    document.querySelector('#router-outlet'),
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
        // {
        //     id: "Assessment",
        //     path: "/assessment/:id/:store_id",
        //     component: AssessmentComponent,
        //     canActivate: listGuard
        // },
    ]
)
