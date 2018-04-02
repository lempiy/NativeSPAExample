import {recognizeValue, getValue} from './helpers'

export class TextResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@text'
    }

    resolve(context, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let value = recognizeValue(expr);
        let resolver
        let data = getValue(context, value);
        resolver = () => {
            let val = getValue(context, value).value
            element.textContent = val
        }
        resolver()
        context._bindView(data.firstKey, resolver)
    }
}
