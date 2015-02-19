minfin = function () {
  var el = document.createElement('div');
  var minfin = document.getElementById('minfin');
  var minfinHeader = document.getElementById('minfin-header');
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = handleStateChangeMinfin;
  xhr.open('GET', 'http://minfin.com.ua/currency/mb/', true);
  xhr.send();
  //minfin
  function handleStateChangeMinfin(data) {
    if (data.currentTarget.readyState == 4) {
      el.innerHTML = data.currentTarget.responseText;
      var lastGraphicValue = data.currentTarget.responseText.replace(/\s/g, '').match(/(\{date:)[a-z,:0-9_\"\.]+}]/g) [0];
      var lastDate = lastGraphicValue.replace(/({date:")|(",bid.*)/g, '');
      var buy  = el.getElementsByClassName('per') [0];
      var sell = el.getElementsByClassName('per') [3];
      minfin.innerHTML += + buy .textContent + 'грн (' + buy .attributes['title'].value + 'грн) - ';
      minfin.innerHTML += + sell.textContent + 'грн (' + sell.attributes['title'].value + 'грн)';
      minfinHeader.innerHTML = lastDate;
    }
  }
}
