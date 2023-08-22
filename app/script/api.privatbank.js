/*jslint browser: true*/
window.privat = function () {
    'use strict';

    var resultEl = document.getElementById('privat'),
        loadImgEl = document.getElementById('privat-img'),
        handleStateChange = function (result) {
            var responseData, buy, sell;

            if (result.currentTarget.readyState === 4) {
                if (result.currentTarget.status !== 200) {
                    window.retryWithDelay(window.nbu);
                    return;
                }
                responseData = JSON.parse(result.currentTarget.response);

                responseData = responseData.filter(function (val) { return val.ccy === 'USD'; });
                responseData = responseData.length && responseData[0];

                if (!responseData) {
                    return;
                }

                buy = +responseData.buy;
                sell = +responseData.sale;

                resultEl.innerHTML = buy.toFixed(2) + 'грн - ' + sell.toFixed(2) + 'грн';

                loadImgEl.style.display  = 'none';
            }
        };
    window.sendRequest("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11", handleStateChange);
};