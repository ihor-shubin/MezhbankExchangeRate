/*jslint browser: true*/
window.nbu = function () {
    'use strict';

    var resultEl = document.getElementById('nbu'),
        loadImgEl = document.getElementById('nbu-img'),
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

                buy = responseData[2].buy;
                sell = responseData[2].sale;

                resultEl.innerHTML = buy + 'грн - ' + sell + 'грн';

                loadImgEl.style.display  = 'none';
            }
        };
    window.sendRequest("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3", handleStateChange);
};