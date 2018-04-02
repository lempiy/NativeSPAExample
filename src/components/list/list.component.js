import {Component} from '../../core/component.js';
import {APP_ROUTER} from '../../routing.js';
import {users} from '../../store/store.js';


export class ListComponent extends Component {
    constructor(conf) {
        conf.tag = 'app-list'
        super(conf)
        this.num = 0
        this.hello = 'hello!'
        this.users = users
    }

    handler(e) {
        console.log('handle', e)
    }

    onInit() {
        console.log("ListComponent", "Init")
    }

    onDestroy() {
        console.log("ListComponent", "Destroy")
    }
}
