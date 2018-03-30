const funcRegExp = /\s*([a-zA-Z]+)\((.*)\)/i;
const identRegExp = /^[$A-Z_][0-9A-Z_$]*$/i;

export const extractFunction = (expr) => {
    if (funcRegExp.test(expr)) {
        funcRegExp.lastIndex = 0
        const match = funcRegExp.exec(expr);
        return {
            name: match[1],
            args: match[2].split(/\s*,\s*/g).filter(arg => !!arg).map(value => {
                return recognizeValue(value)
            })
        }
    }
    return null
}

export const getNestedValue = (obj, value) => {
    let values = value.split(/\s*\.\s*/i);
    return {value: values.reduce((acc, key) => acc[key], obj), firstKey: values[0]}
}

export const recognizeValue = (value) => {
    if (value[0] === '\'' && value[value.length - 1] === '\'') {
        return {
            value,
            type: 'string'
        }
    }
    if (value[0] === '"' && value[value.length - 1] === '"') {
        return {
            value,
            type: 'string'
        }
    }
    if (!isNaN(value)) {
        return {
            value,
            type: 'number'
        }
    }
    if (value === 'true' || value === 'false') {
        return {
            value,
            type: 'boolean'
        }
    }
    if (funcRegExp.test(value)) {
        return {
            value,
            type: 'call'
        }
    }

    if (value.split(/\s*.\s*/i).length > 1) {
        return {
            value,
            type: 'nested-ref'
        }
    }

    return {
        value,
        type: 'ref'
    }
}