/*jslint browser: true*/
window.kurs = function () {
    'use strict';
    var now = new Date(),
        kursLink = 'http://kurs.com.ua/ajax/mejbank_chart_day/usd/' + now.getFullYear() + '-' + window.leftPad(+now.getMonth() + 1, 2) + '-' + window.leftPad(now.getDate(), 2),
        resultEl = document.getElementById('kurs'),
        headerEl = document.getElementById('kurs-header'),
        handleStateChange = function (data) {
            var calcFn = function (val) {
                var i = val.length;

                while (i - 1 > 0) {
                    i = i - 1;
                    if (val[i][1]) {
                        return {
                            date: window.dateToTimeStr(new Date(val[i][0])),
                            value: val[i][1]
                        };
                    }
                }
            }, result, buy, sell, oldBuy, oldSell, buyDiff, cellDiff;

            if (data.currentTarget.readyState === 4) {
                result = JSON.parse(JSON.parse(data.currentTarget.responseText).local[0]);

                buy = calcFn(result.series[1].data);
                sell = calcFn(result.series[0].data);

                oldBuy = calcFn(result.series[3].data);
                oldSell = calcFn(result.series[2].data);

                buyDiff = (buy.value - oldBuy.value).toFixed(4);
                cellDiff = (sell.value - oldSell.value).toFixed(4);

                resultEl.innerHTML += +buy.value + 'грн (' + (buyDiff > 0 ? '↑ ' : '↓ ') + buyDiff + 'грн) - ';
                resultEl.innerHTML += +sell.value + 'грн (' + (cellDiff > 0 ? '↑ ' : '↓ ') + cellDiff + 'грн)';
                headerEl.innerHTML = buy.date;
            }
        };
    window.sendRequest(kursLink, handleStateChange);
};