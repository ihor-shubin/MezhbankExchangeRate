/*jslint browser: true*/
/*jslint regexp: true*/
window.minfin = function () {
    'use strict';
    var resultEl = document.getElementById('minfin'),
        headerEl = document.getElementById('minfin-header'),
        toDayInfo,
        yesterdayInfo,
		getDateObj = function (date) {
			return {
				year:   date.getFullYear(),
				month:  date.getMonth() + 1,
				day:    date.getUTCDate(),
				hour:   date.getHours(),
				minute: date.getMinutes()
			};
		},
        prepareAndCalculateFn = function () {
            var buy,
                yBuy,
                sell,
                ySell,
                date,
                buyDiff,
                sellDiff;
            buy = +toDayInfo[toDayInfo.length - 1].bid;
            yBuy = +yesterdayInfo[yesterdayInfo.length - 1].bid;
            sell = +toDayInfo[toDayInfo.length - 1].ask;
            ySell = +yesterdayInfo[yesterdayInfo.length - 1].ask;

            buyDiff = buy - yBuy;
            sellDiff = sell - ySell;
            date = toDayInfo[toDayInfo.length - 1].date;

            resultEl.innerHTML = buy + 'грн (' + (buyDiff > 0 ? '↑ ' : '↓ ') + buyDiff.toFixed(4) + 'грн) - ';
            resultEl.innerHTML += sell + 'грн (' + (sellDiff > 0 ? '↑ ' : '↓ ') + sellDiff.toFixed(4) + 'грн)';
            headerEl.innerHTML = window.dateToTimeStr(new Date(date), true);
        },
        handleStateChangeToday = function (data) {
            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200 || data.currentTarget.responseText === "") {
                    window.repeatAfterSecond(window.minfin);
                    return;
                }

                toDayInfo = JSON.parse(data.currentTarget.responseText);
                if (yesterdayInfo) { prepareAndCalculateFn(); }
            }
        },
        handleStateChangeYesterday = function (data) {
            if (data.currentTarget.readyState === 4) {
                if (data.currentTarget.status !== 200 || data.currentTarget.responseText === "") {
                    window.repeatAfterSecond(window.minfin);
                    return;
                }

                yesterdayInfo = JSON.parse(data.currentTarget.responseText);
                if (toDayInfo) { prepareAndCalculateFn(); }
            }
        },
		now = getDateObj(new Date()),
		yesterday = new Date(),
		nowAppender = "" + now.year + now.month + now.day + now.hour + now.minute,
		yesterdayAppender;
		
	yesterday.setDate(yesterday.getDate() - 1);
	yesterday = getDateObj(yesterday);
	yesterdayAppender = "" + yesterday.year + yesterday.month + yesterday.day + yesterday.hour + yesterday.minute;
	
    window.sendRequest('https://minfin.com.ua/data/currency/ib/usd.ib.today.json?' + nowAppender, handleStateChangeToday);
    window.sendRequest('https://minfin.com.ua/data/currency/ib/usd.ib.yesterday.json?' + yesterdayAppender, handleStateChangeYesterday);
};
