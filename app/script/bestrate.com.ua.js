/*jslint browser: true*/
/*jslint regexp: true*/
window.bestrate = function () {
    'use strict';

    function query(element, selector){
      var elementsList = element.querySelectorAll(selector);
      var elementsArray = Array.prototype.slice.call(elementsList);
      return elementsArray;
    }

    function queryAndParse(element, selector, parse) {
      return query(element, selector).map(innerText).map(parse).reverse();
    }

    function innerText(element){
      return element.innerText;
    }

    function parseDate(dateStr){
      var match = /(\d\d)-(\d\d)-(\d\d\d\d) (\d\d):(\d\d)/.exec(dateStr);
      return new Date(match[3], match[2] - 1, match[1], match[4], match[5]);
    }

    function parseRate(rateStr){
      var match = /\sUSD\s([\d\.]+)\s+([\d\.]+)/.exec(rateStr);
      return [match[1], match[2]];
    }

    function getDates(el) {
      var selector = "table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.page > tbody > tr > td:nth-child(2) > table:nth-child(5) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:first-child > td > b";
      return  queryAndParse(el, selector, parseDate);
    }

    function getRates(el) {
      var selector = "table > tbody > tr > td > table:nth-child(2) > tbody > tr > td > table.page > tbody > tr > td:nth-child(2) > table:nth-child(5) > tbody > tr > td:nth-child(1) > table:nth-child(2) > tbody > tr > td:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:nth-child(3) > td > p > table > tbody tr:nth-child(3)";
      return  queryAndParse(el, selector, parseRate);
    }

    function atIndex(index){
      return function (array){
        return array[index];
      }
    }

    function xAxisLabel(date){
      return date.getDate();
    }

    function parseResponse(html) {
      var el = document.createElement( 'div' );
      el.innerHTML = html;
      return {
        dates: getDates(el),
        rates: getRates(el)
      };
    }

    function handler(html) {
      var parsed = parseResponse(html);
      var data = {
      labels: parsed.dates.map(xAxisLabel),
        series: [
          parsed.rates.map(atIndex(0)),
          parsed.rates.map(atIndex(1))
        ]
      };

      new Chartist.Line('.ct-chart', data);
      document.getElementById('bestrates-loader').style.display  = 'none';
    };

    window.fetchHtml('http://bestrate.com.ua/news.php?action=view&news_id=2', handler);
};
