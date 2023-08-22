/*jslint browser: true*/
/*jslint regexp: true*/
window.finance = function () {
    'use strict';

    var tmpEl = document.createElement('div'),
        resultEl = document.getElementById('finance'),
        headerEl = document.getElementById('finance-header'),
        handleStateChange = function (data) {
            var buy, buyTitle, sell, sellTitle, date,
                tablePath = '//table[@class="b-market-table_currency-cash"]/';

            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200) {
                    window.retryWithDelay(window.finance);
                    return;
                }

                tmpEl.innerHTML = data.currentTarget.responseText;

                buy = document.evaluate(tablePath + 'tbody/tr[1]/td[2]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                buyTitle = document.evaluate(tablePath + 'tbody/tr[1]/td[2]/i', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};

                sell = document.evaluate(tablePath + 'tbody/tr[1]/td[3]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                sellTitle = document.evaluate(tablePath + 'tbody/tr[1]/td[3]/i', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};

                date = document.evaluate(tablePath + 'thead/tr[1]/th[1]/span[1]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};

                if (buy) {
                    resultEl.innerHTML += (+buy.textContent.replace(/\s/, '')).toFixed(2) + 'грн (' + buyTitle.attributes.title.value.replace(/\sгрн.*/, '').replace('+', '↑ ').replace('-', '↓ ') + 'грн) - ';
                }

                if (buy) {
                    resultEl.innerHTML += (+sell.textContent.replace(/\s/, '')).toFixed(2) + 'грн (' + sellTitle.attributes.title.value.replace(/\sгрн.*/, '').replace('+', '↑ ').replace('-', '↓ ') + 'грн)';
                }

                if (date) {
                    headerEl.innerHTML = date.textContent;
                }

                document.getElementById('finance-img').style.display  = 'none';
            }
        };

    window.sendRequest('https://finance.ua/ru/currency', handleStateChange);
};
