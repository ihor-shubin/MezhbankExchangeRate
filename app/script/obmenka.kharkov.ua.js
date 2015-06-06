/*jslint browser: true*/
/*jslint regexp: true*/
window.kharkov = function () {
    'use strict';

    var handleStateChange = function (data) {
            var buy,
                sell,
                resultEl = document.getElementById('kharkov'),
                headerEl = document.getElementById('kharkov-header'),
                lastData,
                date;

            data = JSON.parse(data);
            lastData = data.length && data[0];
            buy = lastData.amountRetailFrom;
            sell = lastData.amountRetailTo;
            date = lastData.createdAt;

            resultEl.innerHTML += buy + 'грн - ' + sell + 'грн';
            headerEl.innerHTML = window.dateToTimeStr(new Date(date), true);
            document.getElementById('kharkov-img').style.display  = 'none';
        };

    window.fetchHtml('https://obmenka.kharkov.ua/rate/history/1', handleStateChange);
};