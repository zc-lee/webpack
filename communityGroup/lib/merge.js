import { isArray, isPlainObject } from './lang';
const merge = function (deep = false, target = {}, ...source) {
    let options, name, src, copy, copyIsArray, clone;
    const length = source.length;
    for (let i = 0; i < length; ++i) {
        options = source[i];
        // Only deal with non-null/undefined values
        if (options != null) {
            // Extend the base object
            for (name in options) {
                src = target[name];
                copy = options[name];
                // Prevent never-ending loop
                if (target !== copy) {
                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && ((copyIsArray = isArray(copy)) || isPlainObject(copy))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && isArray(src) ? src : [];
                        }
                        else {
                            clone = src && isPlainObject(src) ? src : {};
                        }
                        // Never move original objects, clone them
                        target[name] = merge(deep, clone, copy);
                        // Don't bring in undefined values
                    }
                    else if (typeof copy !== 'undefined') {
                        target[name] = copy;
                    }
                }
            }
        }
    }
    // Return the modified object
    return target;
};
export default merge;
