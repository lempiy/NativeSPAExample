import {EventManager} from './event.manager';
import {TemplateProvider} from './template.provider';
import {Parser} from './parser';

export class App {
    constructor(rootNode, router) {
        this.rootNode = rootNode;
        this._eventMap = {};
        this.router = router;
        this.eventManager = new EventManager({
            router: router,
            rootNode: rootNode
        })
        this.templateProvider = new TemplateProvider('[x-components]')
        this.parser = new Parser(this.eventManager, this.templateProvider);
    }
    start() {
        this.router.setOutlet(this.rootNode)
        this.router.setTools(this.eventManager, this.templateProvider, this.parser)
        this.router.init()
    }
}

