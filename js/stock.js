const _ = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');
const ipcRenderer = require('electron').ipcRenderer;
const ChartistGraph = require('react-chartist')
const moment = require('moment');
var StockData = [];
var temp = '';

function Stock(){
	this.data 	= [];	
	this.date 	= [];	
	this.number = [];	
	this.price 	= [];	
	this.open 	= [];	
	this.high 	= [];	
	this.low 	= [];	
	this.close 	= [];	
	this.diff 	= [];	
	this.volume = [];		
}


ipcRenderer.send('stock-number', '2330');

ipcRenderer.on('stock-data', function(event, arg) {

	// 日期,成交股數,成交金額,開盤價,最高價,最低價,收盤價,漲跌價差,成交筆數
	
	var stock = new Stock();

	var data = JSON.parse(arg);

	_.forIn(data, function(value,key){	
		if( !_.isEmpty(value) ){
			value = value.split(",");

			stock.data.push({
				date	: value[0],
				number  : value[1],
				price  	: value[2],
				open  	: value[3],
				high  	: value[4],
				low  	: value[5],
				close  	: value[6],
				diff  	: value[7],
				volume	: value[8]
			});
			stock.date.push(value[0]); 
			stock.number.push(value[1]); 
			stock.price.push(value[2]);
			stock.open.push(value[3]); 
			stock.high.push(value[4]); 
			stock.low.push(value[5]); 
			stock.close.push(value[6]); 
			stock.diff.push(value[7]);
			stock.volume.push(value[8]);
		}
	});

	var target = _.filter(stock.data, function(n) {
	  	var a_month_before = moment().day(-30);
		var date = n.date.split("/");
		date[0] = (parseInt( date[0] ) + 1911).toString();
		date = date.join('-');
		// console.log(date);
		var isAfter = moment(date,'YYYY-MM-DD').isAfter(a_month_before);

		// console.log(isAfter);
		if(isAfter){
			return n;
		} else {
			return;
		}		
	});

	console.log(target);
	var chart = new Stock();

	_.forEach(target,function(n,key){
		console.log(n.price);
		chart.date.push(n.date); 
		chart.number.push(n.number); 
		chart.price.push(n.price);
		chart.open.push(n.open); 
		chart.high.push(n.high); 
		chart.low.push(n.low); 
		chart.close.push(n.close); 
		chart.diff.push(n.diff);
		chart.volume.push(n.volume);
	});

	
	

	var lineChartData = {
	  labels: chart.date,
	  series: [
	    chart.close,
	  ]
	}
	var lineChartOptions = {
	  low: _.round( _.min(chart.close) )-2,
	  high: _.round( _.max(chart.close) )+2,
	  showArea: false
	}

  	
  	ReactDOM.render(
		<ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />,
		document.getElementById('example')
	);
	
});



