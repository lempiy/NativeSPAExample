'use strict';
require('./main.sass');
import {APP_ROUTER} from './routing';
import {App} from './core/app';

let app = new App(document.querySelector('#router-outlet'), APP_ROUTER);
app.start();