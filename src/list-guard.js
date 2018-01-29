import {users} from './store/store.js'

export function listGuard (params) {
    return users && users.length && !isNaN(+params.id - 1) && 
        users.find(function(u) {
            return u.index == +params.id
        });
}
