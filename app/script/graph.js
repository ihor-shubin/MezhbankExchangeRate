/*jslint browser: true*/
/*jslint regexp: true*/
window.graph = function () {
    'use strict';

    function handler(response) {
        response = JSON.parse(response).reverse();
        var data = {
                series : [
                    response.map(function (val) {
                        return val.amountRetailTo;
                    })
                ],
                labels : response.map(function (val) {
                    var d = new Date(val.createdAt.replace(" ", "T"));
                    return d.getDate() + "/" + (d.getMonth() + 1) + " " + d.getHours() + ":" + d.getMinutes();
                })
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
    }
    window.fetchHtml('https://obmenka.kharkov.ua/rate/history/1', handler);
};