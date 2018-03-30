import {extractFunction} from './helpers'

export class ClickResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@click'
    }

    resolve(component, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let value = extractFunction(expr);
        console.log(value);
    }
}
