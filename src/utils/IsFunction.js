/**
 * @fileoverview check if an object is a function
 */
export default function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
