import {Component} from '../component.js'
import {APP_ROUTER} from '../routing.js'
import {users} from '../store/store.js';

export function ListComponent(conf) {
    Component.call(this, conf)
}

ListComponent.prototype = Object.create(Component.prototype)
ListComponent.prototype.constructor = ListComponent

ListComponent.prototype.onInit = function() {
    var node = document.querySelector("[data-users]")
    var html = users.reduce(function(acc, usr) {
        return acc +=
        '<article>'+
            '<img src="'+usr.picture +'">'+
            '<h3><b>#'+usr.index+"</b>"+usr.name+'</h3>'+
            '<a href="/#/user/'+usr.index+'">Details</a>'+
        '</article>';
    }, "")
    node.insertAdjacentHTML('beforeend', html)
}

ListComponent.prototype.onDestroy = function() {
    console.log("ListComponent", "Destroy")
}
