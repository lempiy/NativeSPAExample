'use strict';
require('./main.sass');
require('file?name=[name].[ext]!../index.html');

import {APP_ROUTER} from './routing';

APP_ROUTER.init();
