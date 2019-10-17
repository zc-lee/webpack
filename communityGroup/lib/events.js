import { canUseDOM } from './dom';
const canUseEventListeners = true;
const bind = canUseEventListeners && window.addEventListener ? 'addEventListener' : 'attachEvent';
const unbind = canUseEventListeners && window.removeEventListener ? 'removeEventListener' : 'detachEvent';
const canEventHasCapture = (bind === 'addEventListener');
const prefix = bind !== 'addEventListener' ? 'on' : '';
/**
 * Bind to DOM events during the bubble phase.
 *
 * @param  {DOMEventTarget} target DOM element to register listener on.
 * @param  {string} eventType Event type, e.g. 'click' or 'mouseover'.
 * @param  {function} callback Callback function.
 * @param  {Boolean} is event capture phase.
 * @return {object} Object with a `remove` method.
 */
export const on = (target, eventType, eventListener, capture) => {
    if (!canUseDOM || !target) {
        return;
    }
    if (capture === true && !canEventHasCapture) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Attempted to listen to events during the capture phase on a ' + 'browser that does not support the capture phase. Your application ' + 'will not receive some events.');
        }
        return {
            off: function noop() { }
        };
    }
    capture = isPassiveMode() ? { passive: false, capture: false } : capture || false;
    target[bind](prefix + eventType, eventListener, capture);
    return {
        off() {
            target[unbind](prefix + eventType, eventListener, capture);
        }
    };
};
/**
 * Unbind to DOM events during the bubble phase.
 *
 * @param  {DOMEventTarget} target DOM element to register listener on.
 * @param  {string} eventType Event type, e.g. 'click' or 'mouseover'.
 * @param  {function} callback Callback function.
 * @param  {Boolean} is event capture phase.
 * @return {Function}
 */
export const off = (target, eventType, eventListener, capture) => {
    if (!canUseDOM || !canUseEventListeners || !target) {
        return;
    }
    capture = isPassiveMode() ? { passive: false, capture: false } : capture || false;
    target[unbind](prefix + eventType, eventListener, capture);
    return eventListener;
};
export const one = (node, eventNames, eventListener) => {
    if (!canUseDOM || !canUseEventListeners || !node) {
        return;
    }
    const typeArray = eventNames.split(' ');
    const recursiveFunction = function (e) {
        e.currentTarget.removeEventListener(e.type, recursiveFunction, isPassiveMode() ? { passive: false, capture: false } : false);
        return eventListener(e);
    };
    for (let i = typeArray.length - 1; i >= 0; i--) {
        on(node, typeArray[i], recursiveFunction);
    }
};
export const getEvent = (event) => {
    return event || window.event;
};
export const getTarget = (event) => {
    event = getEvent(event);
    return event.target || event.srcElement;
};
// ref https://github.com/WICG/EventListenerOptions/pull/30
// Passive event listeners, chrome and touch events
export const isPassiveMode = () => {
    let supportsPassiveOption = false;
    try {
        addEventListener('test', function () { }, Object.defineProperty({}, 'passive', {
            get() {
                supportsPassiveOption = true;
            }
        }));
    }
    catch (e) { }
    return supportsPassiveOption;
};
export const preventDefault = (event) => {
    event = getEvent(event);
    if (event.preventDefault) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
};
export const stopPropagation = (event) => {
    event = getEvent(event);
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    else {
        event.cancelBubble = true;
    }
};
export const getCharCode = (event) => {
    event = getEvent(event);
    if (typeof event.charCode === 'number') {
        return event.charCode;
    }
    else {
        return event.keyCode;
    }
};
export const eventsFor = {
    mouse: {
        start: 'mousedown',
        move: 'mousemove',
        end: 'mouseup'
    },
    touch: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    }
};
// Default to mouse events
export const dragEventFor = (isTouchDevice) => {
    return isTouchDevice ? eventsFor.touch : eventsFor.mouse;
};
