import {Component} from '../component.js'
import {APP_ROUTER} from '../routing.js'
import {users} from '../store/store.js';


export class ListComponent extends Component {
    constructor(conf) {
        super(conf)
    }

    onInit() {
        console.log("ListComponent", "Init")
        const node = document.querySelector("[data-users]")
        const html = users.reduce((acc, usr) => {
            return acc +=
                `<article>
                    <img src="${usr.picture}">
                    <h3><b>#${usr.index}</b>${usr.name}</h3>
                    <a href="#/user/${usr.index}">Details</a>
                </article>`
        }, "")
        node.insertAdjacentHTML('beforeend', html)
    }

    onDestroy() {
        console.log("ListComponent", "Destroy")
    }
}
