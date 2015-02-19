function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = handleStateChangeMinfin; 
xhr.open("GET", "http://minfin.com.ua/currency/mb/", true);
xhr.send();

xhr = new XMLHttpRequest();
var now = new Date();
var kursLink = "http://kurs.com.ua/ajax/mejbank_chart_day/usd/" + now.getFullYear() + "-" + leftPad(+now.getMonth()+1, 2) + "-" + leftPad(now.getDate(), 2);
xhr.onreadystatechange = handleStateChangeKurs; 
xhr.open("GET", kursLink, true);
xhr.send();

var el = document.createElement( 'div' );
var minfin = document.getElementById("minfin");
var minfinHeader = document.getElementById("minfin-header");
var kurs = document.getElementById("kurs");
var kursHeader = document.getElementById("kurs-header");

//minfin
function handleStateChangeMinfin(data){

	if (data.currentTarget.readyState == 4) {
		el.innerHTML = data.currentTarget.responseText;

		var lastGraphicValue = data.currentTarget.responseText.replace(/\s/g,'').match(/(\{date:)[a-z,:0-9_\"\.]+}]/g)[0];
		var lastDate = lastGraphicValue.replace(/({date:")|(",bid.*)/g, '');
		
		var bye = el.getElementsByClassName("per")[0];
		var sell = el.getElementsByClassName("per")[3];
		
		minfin.innerHTML += +bye.textContent + "грн (" + bye.attributes["title"].value + "грн) - ";

		minfin.innerHTML += +sell.textContent + "грн (" + sell.attributes["title"].value + "грн)";
		
		minfinHeader.innerHTML = lastDate;
		
	}
}

//kurs.com.ua
function handleStateChangeKurs(data){
	var calcFn = function(val){
		var i = val.length;
		while(--i > 0){
		  if(val[i][1]){
			var date = new Date(val[i][0]);
			return {
			  date : leftPad(date.getHours(), 2) + ":" + leftPad(date.getMinutes(), 2),
			  value : val[i][1]
			};
		  }
		}
	};
	if (data.currentTarget.readyState == 4) {
		el.innerHTML = data.currentTarget.responseText;

		var result = JSON.parse(JSON.parse(data.currentTarget.responseText).local[0]);
		
		var bye = calcFn(result.series[1].data);
		var sell = calcFn(result.series[0].data);
		
		var oldBye = calcFn(result.series[3].data);
		var oldSell = calcFn(result.series[2].data);
		
		var byeDiff = (+bye.value - +oldBye.value).toFixed(4);
		var cellDiff = (+sell.value - +oldSell.value).toFixed(4);
		
		//kurs.innerHTML += +bye.value + " - " + +sell.value;
		console.log(byeDiff)
		
		kurs.innerHTML += +bye.value + "грн (" + (byeDiff > 0 ? '↑ ' : '↓ ') + byeDiff + "грн) - ";

		kurs.innerHTML += +sell.value + "грн (" + (cellDiff > 0 ? '↑ ' : '↓ ') + cellDiff + "грн)";
		
		kursHeader.innerHTML = bye.date;
		
	}
}