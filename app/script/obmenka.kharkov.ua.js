/*jslint browser: true*/
/*jslint regexp: true*/
window.kharkov = function () {
    'use strict';

    const handleStateChange = function (data) {
            let buy,
                sell,
                resultEl = document.getElementById('kharkov'),
                headerEl = document.getElementById('kharkov-header'),
                date;

        data = JSON.parse(data);
        if (data.result !== 'success' || !data.data || !data.data.rate) {
            return;
        }

        buy = (+data.data.rate.rateBid).toFixed(2);
        sell = (+data.data.rate.rateAsk).toFixed(2);
        date = data.data.history.at(-1).rateDtAdd;

        resultEl.innerHTML += buy + 'грн - ' + sell + 'грн';
        headerEl.innerHTML = window.dateToTimeStr(new Date(date), true);
        document.getElementById('kharkov-img').style.display = 'none';
    },
        requestBody = { "getrates": true, "pairID": 21 };

    window.sendRequestWithRetry('https://obmenka.kharkov.ua/controls', handleStateChange, requestBody, 'POST');
};