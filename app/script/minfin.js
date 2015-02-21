/*jslint browser: true*/
/*jslint regexp: true*/
window.minfin = function () {
    'use strict';
    var tmpEl = document.createElement('div'),
        resultEl = document.getElementById('minfin'),
        headerEl = document.getElementById('minfin-header'),
        handleStateChange = function (data) {
            var lastGraphicValue, buy, sell, buyTitle, sellTitle, buyEl;

            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200) {
                    window.repeatAfterSecond(window.minfin);
                    return;
                }
                tmpEl.innerHTML = data.currentTarget.responseText;

                lastGraphicValue = data
                    .currentTarget
                    .responseText
                    .replace(/\s/g, '')
                    .match(/(\{date:)[a-z,:0-9_\"\.]+\}\]/g)[0]
                    .replace(/\]/, '')
                    .replace(/[a-zA-Z_]+/g, '"$&"');

                lastGraphicValue = JSON.parse(lastGraphicValue);

                buyEl = tmpEl.getElementsByClassName('per');

                buy = lastGraphicValue.bid || lastGraphicValue.bid_old;
                buyTitle = buyEl[0].attributes.title.value;
                sell = lastGraphicValue.ask || lastGraphicValue.ask_old;
                sellTitle = buyEl[3].attributes.title.value;

                resultEl.innerHTML += buy + 'грн (' + buyTitle + 'грн) - ';
                resultEl.innerHTML += sell + 'грн (' + sellTitle + 'грн)';

                lastGraphicValue.date = lastGraphicValue.date.length !== 5 ?
                        lastGraphicValue.date.substring(0, 5) + ' ' + lastGraphicValue.date.substring(5, lastGraphicValue.date.length) :
                        lastGraphicValue.date;
                headerEl.innerHTML = lastGraphicValue.date;

                document.getElementById('minfin-img').style.display  = 'none';
            }
        };

    window.sendRequest('http://minfin.com.ua/currency/mb/', handleStateChange);
};
