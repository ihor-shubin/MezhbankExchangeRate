/*jslint browser: true*/
/*jslint regexp: true*/
window.minfin = function () {
    'use strict';
    var tmpEl = document.createElement('div'),
        resultEl = document.getElementById('minfin'),
        headerEl = document.getElementById('minfin-header'),
        handleStateChange = function (data) {
            var lastGraphicValue, lastDate, buy, sell;

            if (data.currentTarget.readyState === 4) {
                tmpEl.innerHTML = data.currentTarget.responseText;

                lastGraphicValue = data.currentTarget.responseText.replace(/\s/g, '').match(/(\{date:)[a-z,:0-9_\"\.]+\}\]/g)[0];
                lastDate = lastGraphicValue.replace(/(\{date:")|(",bid.*)/g, '');

                buy = tmpEl.getElementsByClassName('per')[0];
                sell = tmpEl.getElementsByClassName('per')[3];

                resultEl.innerHTML += +buy.textContent + 'грн (' + buy.attributes.title.value + 'грн) - ';
                resultEl.innerHTML += +sell.textContent + 'грн (' + sell.attributes.title.value + 'грн)';

                headerEl.innerHTML = lastDate;
            }
        };


    window.sendRequest('http://minfin.com.ua/currency/mb/', handleStateChange);
};
