import {recognizeValue, getNestedValue} from './helpers'

export class TextResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@text'
    }

    resolve(context, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let value = recognizeValue(expr);
        let resolver;
        switch (value.type) {
            case 'ref':
                resolver = () => {element.textContent = context[value.value]}
                resolver()
                
                context._bindView(value.value, resolver)
                break
            case 'nested-ref':
                let data = getNestedValue(context, value.value);
                resolver = () => {
                    let val = getNestedValue(context, value.value).value
                    
                    element.textContent = val
                }
                resolver()
                context._bindView(data.firstKey, resolver)
                break
            default:
                element.textContent = value.value
                break
        }
    }
}
