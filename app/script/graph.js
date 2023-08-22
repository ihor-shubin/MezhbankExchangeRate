/*jslint browser: true*/
/*jslint regexp: true*/
window.graph = function () {
    'use strict';
    
    function formatDate(dateStr) {
        var date = new Date(dateStr.replace(" ", "T"));

        return leftPad(date.getDate()) + "." + leftPad(date.getMonth() + 1) + " " + leftPad(date.getHours()) + ":" + leftPad(date.getMinutes());
    }

    const handler = function (response) {
        const historyDataResponse = JSON.parse(response).data.history;
        const groupedHistoryPerDay = groupBy(historyDataResponse.map(x => { return { date: x.rateDtAdd.substr(0, 10), datetime: x.rateDtAdd, rateBid: x.rateBid }; }), 'date');
        const historyData = [];
        const maxHistoryItems = 6;

        for (let groupKey in groupedHistoryPerDay) {
            const maxHistoryBid = groupedHistoryPerDay[groupKey].map(x => +x.rateBid).max();
            const maxBidItem = groupedHistoryPerDay[groupKey].filter(x => +x.rateBid === maxHistoryBid).at(-1);

            historyData.push({
                value: maxBidItem.rateBid,
                label: formatDate(maxBidItem.datetime)
            });
        }

        let data = {
            series: [historyData.map(x => x.value).slice(-maxHistoryItems)],
            labels: historyData.map(x => x.label).slice(-maxHistoryItems)
        },
            tmp,
            min,
            max,
            chart,
            tooltip;

        //data.labels.length = data.series[0].length;
        min = Math.min.apply(null, data.series[0].map(function (val) { return parseFloat(val); }));
        max = Math.max.apply(null, data.series[0].map(function (val) { return parseFloat(val); }));
        tmp = new window.Chartist.Line('.ct-chart', data, {  low: min - 1, high: max + 1 });
        chart = window.$('.ct-chart');

        tooltip = chart.append('<div class="tooltip"></div>').find('.tooltip').hide();
        chart.on('mouseenter', '.ct-point', function () {
            var $point = window.$(this),
                value = $point.attr('ct:value');
            tooltip.html(value).show();
        });

        chart.on('mouseleave', '.ct-point', function () {
            tooltip.hide();
        });

        chart.on('mousemove', function (event) {
            tooltip.css({
                left: (event.offsetX || event.originalEvent.layerX) - tooltip.width() / 2 - 10,
                top: (event.offsetY || event.originalEvent.layerY) - tooltip.height() - 10
            });
        });

        document.getElementById('bestrates-loader').style.display = 'none';
    },
        requestBody = { "getrates": true, "pairID": 21 };

    window.sendRequestWithRetry('https://obmenka.kharkov.ua/controls', handler, requestBody, 'POST');
};