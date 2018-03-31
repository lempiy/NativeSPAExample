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

    onInit() {
        console.log("ListComponent", "Init")
        setTimeout(()=> {
            this.users.push({
                "index": 4,
                "guid": "995dea8c-a354-439b-b067-f7afcaba0b1e",
                "isActive": false,
                "balance": "$3,611.39",
                "picture": "https://placekitten.com/280/280",
                "age": 5,
                "eyeColor": "blue",
                "name": "Holman",
                "gender": "male",
                "company": "QUARX",
                "email": "holmanabbott@quarx.com",
                "phone": "+1 (905) 436-2094",
                "about": "Voluptate quis sit non laborum. Cillum sunt qui tempor nostrud ut deserunt tempor aliquip. Magna do ullamco nostrud consectetur consequat nostrud duis occaecat consectetur proident incididunt cupidatat. Nulla esse cupidatat dolor nostrud do in minim do ea. Dolor eiusmod exercitation nulla est dolore ullamco magna fugiat irure culpa ea.\r\n",
                "registered": "2016-12-01T06:58:29 -02:00",
                "tags": [
                    "proident",
                    "incididunt",
                    "do",
                    "commodo",
                    "sunt",
                    "deserunt",
                    "qui"
                ],
                "friends": [
                    {
                        "id": 0,
                        "name": "Clemons Joyce"
                    },
                    {
                        "id": 1,
                        "name": "Melendez Schroeder"
                    },
                    {
                        "id": 2,
                        "name": "Gilbert Romero"
                    }
                ],
                "greeting": "Hello, Holman! You have 10 unread messages.",
                "favoriteFruit": "strawberry"
            })
        }, 3000)
    }

    onDestroy() {
        console.log("ListComponent", "Destroy")
    }
}
