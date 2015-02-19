/*jslint browser: true*/
/*jslint regexp: true*/
window.kharkov = function () {
    var tmpEl = document.createElement('div'),
        resultEl = document.getElementById('kharkov'),
        headerEl = document.getElementById('kharkov-header'),
        handleStateChange = function (data) {
            var buy, sell;

            if (data.currentTarget.readyState === 4) {
                tmpEl.innerHTML = data.currentTarget.responseText;

                buy = tmpEl.getElementsByClassName("rate")[0];
                sell = tmpEl.getElementsByClassName("rate")[1];

                resultEl.innerHTML += buy.textContent + 'грн - ' + sell.textContent + 'грн';

                headerEl.innerHTML = window.dateToTimeStr(new Date());
            }
        };

    window.sendRequest('http://obmenka.kharkov.ua/', handleStateChange);
};
