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
                let {value, firstKey} = getNestedValue(context, value.value)
                console.log(value,firstKey)
                resolver = () => {element.textContent = value}
                resolver()
                context._bindView(firstKey, resolver)
                break
        }
    }
}
