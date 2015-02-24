/*jslint browser: true*/
/*jslint regexp: true*/
window.finance = function () {
    'use strict';

    var tmpEl = document.createElement('div'),
        resultEl = document.getElementById('finance'),
        headerEl = document.getElementById('finance-header'),
        handleStateChange = function (data) {
            var buy, buyTitle, sell, sellTitle, date;

            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200) {
                    window.repeatAfterSecond(window.finance);
                    return;
                }

                tmpEl.innerHTML = data.currentTarget.responseText;

                buy = document.evaluate('//*[@id="market-table_currency-order_limiter"]/table/tbody/tr[1]/td[2]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                sell = document.evaluate('//*[@id="market-table_currency-order_limiter"]/table/tbody/tr[1]/td[3]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                buyTitle = document.evaluate('//*[@id="market-table_currency-order_limiter"]/table/tbody/tr[1]/td[2]/i', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                sellTitle = document.evaluate('//*[@id="market-table_currency-order_limiter"]/table/tbody/tr[1]/td[3]/i', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};
                date = document.evaluate('//*[@id="market-table_currency-order_limiter"]/table/thead/tr[1]/th[1]/span[1]', tmpEl,  null, window.XPathResult.ANY_TYPE, null).iterateNext() || {};

                resultEl.innerHTML += (+buy.textContent.replace(/\s/, '')).toFixed(2) + 'грн (' + buyTitle.attributes.title.value.replace(/\sгрн.*/, '').replace('+', '↑ ').replace('-', '↓ ') + 'грн) - ';
                resultEl.innerHTML += (+sell.textContent.replace(/\s/, '')).toFixed(2) + 'грн (' + sellTitle.attributes.title.value.replace(/\sгрн.*/, '').replace('+', '↑ ').replace('-', '↓ ') + 'грн)';

                headerEl.innerHTML = date.textContent;

                document.getElementById('finance-img').style.display  = 'none';
            }
        };

    window.sendRequest('http://finance.ua/ru/currency', handleStateChange);
};
