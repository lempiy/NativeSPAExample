import {Component} from '../component.js'
import {APP_ROUTER} from '../routing.js'
import {users} from '../store/store.js';

export function UserComponent(conf) {
    Component.call(this, conf)
}

UserComponent.prototype = Object.create(Component.prototype)
UserComponent.prototype.constructor = UserComponent

UserComponent.prototype.onInit = function() {
    var node = document.querySelector("[data-user]")
    var id = APP_ROUTER.currentRoute.params.id
    var usr = users.find(function(u) {
        return u.index == +id;
    })
    var html = '<article>'+
            '<img class="face" src='+usr.picture+'>'+
            '<table>'+
                '<tbody>'+
                    '<tr>'+
                        '<th>Name:</th>'+
                        '<td>'+usr.name+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<th>Age:</th>'+
                        '<td>'+usr.age+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<th>Gender:</th>'+
                        '<td>'+usr.gender+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<th>Company:</th>'+
                        '<td>'+usr.company+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<th>Favorite fruit:</th>'+
                        '<td>'+usr.favoriteFruit+'</td>'+
                    '</tr>'+
                    '<tr>'+
                        '<th>Tags:</th>'+
                        '<td>'+usr.tags
                                .map(function(tag) {
                                    return "#" + tag;
                                })
                                .join(", ")+'</td>'+
                    '</tr>'+
                '</tbody>'+
            '</table>'+
            '<p>'+
                '<span>About:</span>'+
                usr.about+
            '</p>'+
            '<p>'+
                '<span>Registered:</span>'+
                +usr.registered.slice(0, 10)+
            '</p>'+
            '<a href="/#/list">Back</a>'+
        '</article>';
    node.insertAdjacentHTML('beforeend', html)
    
    this.onEvent('click', '.face', function(e) {
        var utterThis = new SpeechSynthesisUtterance(usr.name);
        window.speechSynthesis.speak(utterThis)
    })
}

UserComponent.prototype.onDestroy = function() {
    console.log("UserComponent", "Destroy")
}
