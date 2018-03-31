import {extractFor, getValue, isIterable} from './helpers'
import {Context} from '../change.detection'

export class ForResolver {
    constructor(parser) {
        this.parser = parser;
        this.syntaxAttr = '@for'
    }

    resolve(context, element) {
        let expr = element.getAttribute(this.syntaxAttr);
        let data = extractFor(expr);
        if (!data) {
            throw new Error('Wrong for expr syntax')
        }
        let resolver;
        let value = getValue(context, data.value)
        if (!value) {
            throw new Error('Wrong for expr syntax')
        }
        if (!isIterable) {
            throw new Error('Value is not iterable')
        }
        let elem = element.firstElementChild.content;
        let repeatContext = new Context(context, this.parser);
        context.addChildContext(repeatContext);
        let parent = element.parentNode
        element.parentNode.removeChild(element)
        resolver = () => {
            let i = 0;
            Array.from(parent.children).forEach(child => {
                if (child.getAttribute('@for') === expr) {
                    parent.removeChild(child)
                }
            })
            repeatContext.clearContext()
            for (let v of value.value) {
                let node = element.cloneNode()
                let ctx = new Context(repeatContext, this.parser).toProxy();
                let el = document.importNode(elem, true);
                
                if (Array.isArray(data.name)) {
                    ctx[data.name[0]] = i
                    ctx[data.name[1]] = v
                } else {
                    ctx[data.name] = v
                }
                node.appendChild(el)
                parent.appendChild(node)
                repeatContext.addChildContext(ctx);
                this.parser.parse(ctx, node);
                i++
            }
        }
        resolver()
        repeatContext._bindView(value.key, resolver)
    }
}
