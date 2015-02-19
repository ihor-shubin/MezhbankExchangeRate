/*global window*/
function leftPad(number, targetLength) {
    'use strict';
    var output = String(number);
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function sendRequest(url, callbackFn) {
    'use strict';
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = callbackFn;
    xhr.open('GET', url, true);
    xhr.send();
}

function dateToTimeStr(date) {
    'use strict';
    return leftPad(date.getHours(), 2) + ':' + leftPad(date.getMinutes(), 2);
}