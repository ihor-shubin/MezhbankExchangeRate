/*jslint browser: true*/
function leftPad(number, targetLength) {
    'use strict';
    
    let output = String(number);
    targetLength = targetLength || 2;

    while (output.length < targetLength) {
        output = '0' + output;
    }

    return output;
}

function dateToTimeStr(date, isShowDate) {
    'use strict';
    var dateStr = !isShowDate ? "" : leftPad(date.getDate(), 2) + "." + leftPad(date.getMonth() + 1, 2);
    return leftPad(date.getHours(), 2) + ':' + leftPad(date.getMinutes(), 2) + " " + dateStr;
}

function retryWithDelay(fn) {
    'use strict';
    window.setTimeout(fn, 2000);
}

function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
        if (!memo[x[property]]) { memo[x[property]] = []; }
        memo[x[property]].push(x);
        return memo;
    }, {});
}

Array.prototype.max = function () {
    return Math.max.apply(null, this);
};

function sendRequest(url, callbackFn, body, method) {
    'use strict';
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = callbackFn;
    xhr.open(method || 'GET', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

    }

    xhr.send(JSON.stringify(body));
}

function sendRequestWithRetry(url, handler, body, method) {
    'use strict';

    function handleStateChange(data) {
        if (data.currentTarget.readyState === 4) {
            if (data.currentTarget.status !== 200) {
                window.retryWithDelay(handleStateChange);
                return;
            }
            handler(data.currentTarget.responseText);
        }
    }

    window.sendRequest(url, handleStateChange, body, method);
}