/*jslint browser: true*/
window.privat = function () {
    'use strict';

    var resultEl = document.getElementById('privat'),
        loadImgEl = document.getElementById('privat-img'),
        handleStateChange = function (result) {
            var responseData, buy, sell;

            if (result.currentTarget.readyState === 4) {
                if (result.currentTarget.status !== 200) {
                    window.repeatAfterSecond(window.nbu);
                    return;
                }
                responseData = JSON.parse(result.currentTarget.response);

                if (!responseData || !responseData[2]) {
                    return;
                }

                buy = +responseData[2].buy;
                sell = +responseData[2].sale;

                resultEl.innerHTML = buy.toFixed(4) + 'грн - ' + sell.toFixed(4) + 'грн';

                loadImgEl.style.display  = 'none';
            }
        };
    window.sendRequest("https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11", handleStateChange);
};