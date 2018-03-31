import {recognizeValue, getNestedValue} from './helpers'

export class SrcResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@srcpath'
    }

    resolve(context, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let value = recognizeValue(expr);
        let resolver;
        switch (value.type) {
            case 'ref':
                resolver = () => {element.src = context[value.value]}
                resolver()
                
                context._bindView(value.value, resolver)
                break
            case 'nested-ref':
                let data = getNestedValue(context, value.value);
                resolver = () => {
                    let val = getNestedValue(context, value.value).value
                    
                    element.src = val
                }
                resolver()
                context._bindView(data.firstKey, resolver)
                break
            default:
                element.src = value.value
                break
        }
    }
}
