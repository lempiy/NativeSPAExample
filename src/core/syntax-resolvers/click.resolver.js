import {extractFunction, getValue, recognizeValue} from './helpers'

export class ClickResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@click'
    }

    resolve(context, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let value = extractFunction(expr);
        let func = getValue(context, recognizeValue(value.name))
        let id = ""
        let ctx = context
        while(ctx) {
            if (ctx.id) {
                id = ctx.id
                break
            } else {
                ctx = ctx._parent
            }
        }
        if (id) {
            this.parser.eventManager.registerEvent('click', id, element, (e) => {
                func.value(...value.args.map(arg => getValue(context, arg).value))
            })
        }
    }
}
