/*jslint browser: true*/
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

function repeatAfterSecond(fn) {
    'use strict';
    window.setTimeout(fn, 1000);
}

function fetchHtml(url, handler) {
    'use strict';

    function handleStateChange(data) {
        if (data.currentTarget.readyState === 4) {
            if (data.currentTarget.status !== 200) {
                window.repeatAfterSecond(handleStateChange);
                return;
            }
            handler(data.currentTarget.responseText);
        }
    }
    window.sendRequest(url, handleStateChange);
}
