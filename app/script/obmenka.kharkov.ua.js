/*jslint browser: true*/
/*jslint regexp: true*/
window.kharkov = function () {
    'use strict';

    var handleStateChange = function (html) {
            var buy,
                sell,
                tmpEl = document.createElement('div'),
                resultEl = document.getElementById('kharkov');

            tmpEl.innerHTML = html;

            buy = tmpEl.getElementsByClassName("rate")[0];
            sell = tmpEl.getElementsByClassName("rate")[1];

            resultEl.innerHTML += buy.textContent + 'грн - ' + sell.textContent + 'грн';

            document.getElementById('kharkov-img').style.display  = 'none';
        };

    window.fetchHtml('http://obmenka.kharkov.ua/', handleStateChange);
};