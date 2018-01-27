import {Component} from '../component.js'
import {APP_ROUTER} from '../routing.js'
import {users} from '../store/store.js';


export class UserComponent extends Component {
    constructor(conf) {
        super(conf)
    }

    onInit() {
        console.log("UserComponent", "Init")
        const node = document.querySelector("[data-user]")
        let id = APP_ROUTER.currentRoute.params.id
        let usr = users.find(u => u.index == +id)
        let html = `
        <article>
            <img class="face" src="${usr.picture}">
            <table>
                <tbody>
                    <tr>
                        <th>Name:</th>
                        <td>${usr.name}</td>
                    </tr>
                    <tr>
                        <th>Age:</th>
                        <td>${usr.age}</td>
                    </tr>
                    <tr>
                        <th>Gender:</th>
                        <td>${usr.gender}</td>
                    </tr>
                    <tr>
                        <th>Company:</th>
                        <td>${usr.company}</td>
                    </tr>
                    <tr>
                    <th>Favorite fruit:</th>
                        <td>${usr.favoriteFruit}</td>
                    </tr>
                    <tr>
                        <th>Tags:</th>
                        <td>${usr.tags.map(tag => "#"+ tag).join(", ")}</td>
                    </tr>
                </tbody>
            </table>
            <p>
                <span>About:</span>
                ${usr.about}
            </p>
            <p>
                <span>Registered:</span>
                ${usr.registered.slice(0, 10)}
            </p>
            <a href="/#/list">Back</a>
        </article>`
        node.insertAdjacentHTML('beforeend', html)
        
        this.onEvent('click', '.face', e => {
            let utterThis = new SpeechSynthesisUtterance(usr.name);
            window.speechSynthesis.speak(utterThis)
        })
    }

    onDestroy() {
        console.log("UserComponent", "Destroy")
    }
}
