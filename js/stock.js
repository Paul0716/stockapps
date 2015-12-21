const _ = require('lodash');
const React = require('react');
const ReactDOM = require('react-dom');
const ipcRenderer = require('electron').ipcRenderer;
const ChartistGraph = require('react-chartist')
var StockData = [];
var temp = '';

function Stock(json_data){
	this.date 	= [];
	this.number = [];
	this.price 	= [];
	this.open 	= [];
	this.high 	= [];
	this.low 	= [];
	this.close	= [];
	this.diff 	= [];
	this.volume = [];

	this.init = function(json_data){
		var data = JSON.parse(arg);
		_.forIn(data, function(value,key){	
		if( !_.isEmpty(value) ){
				value = value.split(",");
				this.date.push(value[0]); 
				this.number.push(value[1]); 
				this.price.push(value[2]); 
				this.open.push(value[3]); 
				this.high.push(value[4]); 
				this.low.push(value[5]); 
				this.close.push(value[6]); 
				this.diff.push(value[7]);
				this.volume.push(value[8]);
			}
		});
	}

}


ipcRenderer.send('stock-number', '0050');

ipcRenderer.on('stock-data', function(event, arg) {

	// 日期,成交股數,成交金額,開盤價,最高價,最低價,收盤價,漲跌價差,成交筆數
	
	var stock = new Stock(arg);

	_.sortBy(stock,function(n){
		console.log(n);
		return n;
	});



	var lineChartData = {
	  labels: stock.date,
	  series: [
	    stock.price
	  ]
	}
	var lineChartOptions = {
	  low: 1,
	  showArea: false
	}

  	
  	ReactDOM.render(
		<ChartistGraph data={lineChartData} options={lineChartOptions} type={'Line'} />,
		document.getElementById('example')
	);
	
});



