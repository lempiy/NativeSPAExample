import {users} from './store/store.js'

export const listGuard = (params) => {
    return users && users.length && !isNaN(+params.id - 1) && users.find(u => u.index == +params.id)
}
