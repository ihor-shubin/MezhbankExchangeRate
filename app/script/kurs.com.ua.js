kurs = function () {
  var xhr = new XMLHttpRequest();
  var now = new Date();
  var kursLink = 'http://kurs.com.ua/ajax/mejbank_chart_day/usd/' + now.getFullYear() + '-' + leftPad( + now.getMonth() + 1, 2) + '-' + leftPad(now.getDate(), 2);
  var kurs = document.getElementById('kurs');
  var kursHeader = document.getElementById('kurs-header');
  
  xhr.onreadystatechange = handleStateChangeKurs;
  xhr.open('GET', kursLink, true);
  xhr.send();
  
  function handleStateChangeKurs(data) {
    var calcFn = function (val) {
      var i = val.length;
      while (--i > 0) {
        if (val[i][1]) {
          var date = new Date(val[i][0]);
          return {
            date: leftPad(date.getHours(), 2) + ':' + leftPad(date.getMinutes(), 2),
            value: val[i][1]
          };
        }
      }
    };
    if (data.currentTarget.readyState == 4) {
      var result = JSON.parse(JSON.parse(data.currentTarget.responseText).local[0]);
      var buy = calcFn(result.series[1].data);
      var sell = calcFn(result.series[0].data);
      var oldBuy = calcFn(result.series[3].data);
      var oldSell = calcFn(result.series[2].data);
      var buyDiff = ( + buy.value - + oldBuy.value).toFixed(4);
      var cellDiff = ( + sell.value - + oldSell.value).toFixed(4);
      kurs.innerHTML += + buy.value + 'грн (' + (buyDiff > 0 ? '↑ ' : '↓ ') + buyDiff + 'грн) - ';
      kurs.innerHTML += + sell.value + 'грн (' + (cellDiff > 0 ? '↑ ' : '↓ ') + cellDiff + 'грн)';
      kursHeader.innerHTML = buy.date;
    }
  }
}
