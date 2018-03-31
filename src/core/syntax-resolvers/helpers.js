const funcRegExp = /\s*([$A-Z_][0-9A-Z_$]*)\((.*)\)/i;
const identRegExp = /^[$A-Z_][0-9A-Z_$]*$/i;
const forRegExp = /^\s*for\s+(\(?\s*[[$A-Z_][0-9A-Z_$]*(?:\s*\,\s*[a-zA-Z][a-zA-Z0-9]*)?\s*\)?)\s+of\s+([a-zA-Z][a-zA-Z0-9]*(?:\.[a-zA-Z][a-zA-Z0-9]*)*(?:\(\))?)\s*$/i;


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

export const extractFor = (expr) => {
    if (!forRegExp.test(expr)) {
        return null
    }
    forRegExp.lastIndex = 0
    const match = forRegExp.exec(expr);
    let name = match[1]
    if (name[0] == '(') {
        name = name.replace(/[\s*\(\)]*/g, "").split(",")
    }
    let v = recognizeValue(match[2]);

    return {
        name: name,
        value: recognizeValue(match[2])
    }
}

export const isIterable = (obj) => {
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

export const getValue = (obj, value) => {
    switch (value.type) {
        case 'string':
            return {key: value.value, 
                value: value.value.replace(/^[\'\"]/g, "").replace(/[\'\"]$/g, "")
            }
        case 'number':
            return {key: value.value, value: +value.value}
        case 'boolean':
            return {key: value.value, value: value.value === 'true'}
        case 'call':
            return //TODO
        case 'nested-ref':
            return getNestedValue(obj, value.value)
        case 'ref':
            return {key: value.value, value: obj[value.value]}
        default:
            return null
    }
    return {key: value.value, value: obj[value]}
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
    if (value.split(/\s*\.\s*/i).length > 1) {
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