/*jslint browser: true*/
/*jslint regexp: true*/
window.minfin = function () {
    'use strict';
    var resultEl = document.getElementById('minfin'),
        headerEl = document.getElementById('minfin-header'),
        toDayInfo,
        yesterdayInfo,
        prepareAndCalculateFn = function () {
            var buy,
                yBuy,
                sell,
                ySell,
                date,
                buyDiff,
                sellDiff;
            buy = +toDayInfo[toDayInfo.length - 1].ask;
            yBuy = +yesterdayInfo[yesterdayInfo.length - 1].ask;
            sell = +toDayInfo[toDayInfo.length - 1].bid;
            ySell = +yesterdayInfo[yesterdayInfo.length - 1].bid;

            buyDiff = buy - yBuy;
            sellDiff = sell - ySell;
            date = toDayInfo[toDayInfo.length - 1].date;

            resultEl.innerHTML = buy + 'грн (' + (buyDiff > 0 ? '↑ ' : '↓ ') + buyDiff.toFixed(4) + 'грн) - ';
            resultEl.innerHTML += sell + 'грн (' + (sellDiff > 0 ? '↑ ' : '↓ ') + sellDiff.toFixed(4) + 'грн)';
            headerEl.innerHTML = window.dateToTimeStr(new Date(date), true);
        },
        handleStateChangeToday = function (data) {
            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200 || data.currentTarget.responseText === "") {
                    window.repeatAfterSecond(window.minfin);
                    return;
                }

                toDayInfo = JSON.parse(data.currentTarget.responseText);
                if (yesterdayInfo) { prepareAndCalculateFn(); }
            }
        },
        handleStateChangeYesterday = function (data) {
            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200 || data.currentTarget.responseText === "") {
                    window.repeatAfterSecond(window.minfin);
                    return;
                }

                yesterdayInfo = JSON.parse(data.currentTarget.responseText);
                if (toDayInfo) { prepareAndCalculateFn(); }
            }
        };

    window.sendRequest('http://minfin.com.ua/data/currency/ib/usd.ib.today.json?201507271634/', handleStateChangeToday);
    window.sendRequest('http://minfin.com.ua/data/currency/ib/usd.ib.yesterday.json?201507271634', handleStateChangeYesterday);
};
