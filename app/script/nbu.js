/*jslint browser: true*/
window.nbu = function () {
    'use strict';

    const resultEl = document.getElementById('nbu'),
        loadImgEl = document.getElementById('nbu-img'),
        headerEl = document.getElementById('nbu-header'),
        handleStateChange = function (result) {
            let responseData, rate, date;

            if (result.currentTarget.readyState === 4) {
                if (result.currentTarget.status !== 200) {
                    window.retryWithDelay(window.nbu);
                    return;
                }

                responseData = JSON.parse(result.currentTarget.response);

                if (!responseData) {
                    return;
                }

                const usdRate = responseData.filter(x => x.cc === 'USD')[0] || {};
                rate = usdRate.rate || '-';
                date = usdRate.exchangedate;

                resultEl.innerHTML = (rate).toFixed(2) + 'грн';
                headerEl.innerHTML = date;

                loadImgEl.style.display  = 'none';
            }
        };
    window.sendRequest("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json", handleStateChange);
};