// ==ClosureCompiler==
// @output_file_name default.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// @code_url https://cryptopools.aod-tech.com/static/externs.js
// ==/ClosureCompiler==

function buildChartData(){
	var pools = {};

	poolKeys = [];
	for (var i = 0; i < statData.length; i++){
		for (var pool in statData[i]['pools']){
			if (poolKeys.indexOf(pool) === -1)
				poolKeys.push(pool);
		}
	}

	for (var i = 0; i < statData.length; i++){
		var time = statData[i]['time'] * 1000;

		for (var f = 0; f < poolKeys.length; f++){
			var pName = poolKeys[f];
			var a = pools[pName] = (pools[pName] || {
				'hashrate': [],
				'workers': [],
				'blocks': []
			});
			if (pName in statData[i]['pools']){
				a['hashrate'].push([time, statData[i]['pools'][pName]['hashrate']]);
				a['workers'].push([time, statData[i]['pools'][pName]['workerCount']]);
				a['blocks'].push([time, statData[i]['pools'][pName]['blocks']['pending']])
			}
			else{
				a['hashrate'].push([time, 0]);
				a['workers'].push([time, 0]);
				a['blocks'].push([time, 0])
			}
		}
	}

	poolWorkerData = [];
	poolHashrateData = [];
	poolBlockData = [];

	for (var pool in pools){
		poolWorkerData.push({
			'key': pool.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){return s.toUpperCase()}),
			'values': pools[pool]['workers']
		});
		poolHashrateData.push({
			'key': pool.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){return s.toUpperCase()}),
			'values': pools[pool]['hashrate']
		});
		poolBlockData.push({
			'key': pool.replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){return s.toUpperCase()}),
			'values': pools[pool]['blocks']
		})
	}
}

function getReadableHashRateString(hashrate){
	var i = -1;
	var byteUnits = [ ' KH', ' MH', ' GH', ' TH', ' PH' ];
	do {
		hashrate = hashrate / 1024;
		i++;
	} while (hashrate > 1024);
	return Math.round(hashrate) + byteUnits[i];
}

function timeOfDayFormat(timestamp){
	var dStr = d3.time.format('%I:%M %p')(new Date(timestamp));
	if (dStr.indexOf('0') === 0) dStr = dStr.slice(1);
	return dStr;
}

function displayCharts(){
	nv.addGraph(function() {
		poolWorkerChart = nv.models.stackedAreaChart()
			.margin({'left': 40, 'right': 40})
			.x(function(d){ return d[0] })
			.y(function(d){ return d[1] })
			.useInteractiveGuideline(true)
			.clipEdge(true);

		poolWorkerChart['xAxis']['tickFormat'](timeOfDayFormat);

		poolWorkerChart['yAxis']['tickFormat'](d3.format('d'));

		d3.select('#poolWorkers').datum(poolWorkerData).call(poolWorkerChart);

		return poolWorkerChart;
	});

	nv.addGraph(function() {
		poolHashrateChart = nv.models.lineChart()
			.margin({'left': 60, 'right': 40})
			.x(function(d){ return d[0] })
			.y(function(d){ return d[1] })
			.useInteractiveGuideline(true);

		poolHashrateChart['xAxis']['tickFormat'](timeOfDayFormat);

		poolHashrateChart['yAxis']['tickFormat'](function(d){
			return getReadableHashRateString(d);
		});

		d3.select('#poolHashrate').datum(poolHashrateData).call(poolHashrateChart);

		return poolHashrateChart;
	});

	nv.addGraph(function() {
		poolBlockChart = nv.models.multiBarChart()
			.x(function(d){ return d[0] })
			.y(function(d){ return d[1] });

		poolBlockChart['xAxis']['tickFormat'](timeOfDayFormat);

		poolBlockChart['yAxis']['tickFormat'](d3.format('d'));

		d3.select('#poolBlocks').datum(poolBlockData).call(poolBlockChart);

		return poolBlockChart;
	});
}

function TriggerChartUpdates(){
	if ( currentPage === 'stats' ) {
		poolWorkerChart.update();
		poolHashrateChart.update();
		poolBlockChart.update();
	}
}

function showCoinConfig(info){
	var htmlKeys = '<div class="coinInfoData">Algorithm:</div>';
	var htmlValues = '<div class="coinInfoData">' + info['algo'] + '</div>';

	for (var port in info['ports']){
		var difficulty = 'Low';
		switch( info['ports'][port]['diff'] ) {
			case 1:
			default:
				break;
			case 1280:
				difficulty = 'Med';
				break;
			case 51200:
				difficulty = 'High';
				break;
		}
		htmlKeys += '<div class="coinInfoData">URL <span class="coinInfoSubtle">(' + difficulty + ')</span>:</div>';
		htmlValues += '<div class="coinInfoData">stratum+tcp://' + info['host'] + ':' + port + '</div>';
	}

	if (info['coin']){
		$('#coinInfoUsername').text('Your ' + info['coin']['name']['replace'](/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(s){return s.toUpperCase()}) + ' wallet address');
	}else{
		$('#coinInfoUsername').text('Your public key');
	}
	$('.coinInfoData').remove();
	$('#coinInfoRowKeys').append(htmlKeys);
	$('#coinInfoRowValues').append(htmlValues);
}

var poolWorkerData;
var poolHashrateData;
var poolBlockData;

var poolWorkerChart;
var poolHashrateChart;
var poolBlockChart;

var statData;
var poolKeys;

var currentPage = location.pathname.substr(1) || 'home';

$(function() {
	var hotSwap = function(page, pushSate){
		var title = 'The Crypto Pools';

		switch ( page ) {
			case 'getting-started':
				title = 'Getting Started - ' + title;
				break;
			case 'stats':
				title = 'Graphs - ' + title;
				break;
			case 'tbs':
				title = 'Statistics - ' + title;
				break;
			case 'workers':
				title = 'Workers - ' + title;
				break;
			case 'api':
				title = 'API - ' + title;
				break;
			case '':
			default:
				break;
		}

		if (pushSate) {
			history.pushState({
				'oldPage': location.pathname.slice(1)
			}, title, '/' + page);
		}
		document.title = title;

		$('.menu-selected')['removeClass']('menu-selected');
		$('a[href="/' + page + '"]')['parent']()['addClass']('menu-selected');
		$.get('/get-page', {'id': page}, function(data){
			$('main').html(data);

			if (page === 'stats') {
				buildChartData();
				displayCharts();
			}
			currentPage = page || 'home';
		}, 'html');
	};

	document.addEventListener('click', function(event) {
		if (event.which !== 1) return;

		var $target = $(event.target);
		if ($target.hasClass('hamburger')) {
			// Prevent screwy loops caused by the AMP sidebar
			history.pushState(null, document.title, location.pathname);
		}
	}, true);

	document.addEventListener('click', function(event) {
		if (event.which !== 1) return;

		var $target = $(event.target);
		if ($target.hasClass( 'hot-swapper')) {
			if ( typeof history.state['oldPage'] === 'undefined' ) {
				// Close the AMP sidebar
				$('amp-sidebar button.i-amphtml-screen-reader')[0].click();
				history.forward();
			}
			var pageId = $target.attr('href').slice(1);
			hotSwap(pageId, true);
			event.preventDefault();
			event.stopPropagation();
			return false;
		}
	}, true);

	$(document).on('click', '#coinGlowTrigger', function(event){
		event.preventDefault();
		$('.menuList').addClass('glow');
		setTimeout(function(){
			$('.menuList').removeClass('glow');
		}, 200);
		return false;
	}).on('click', '.poolOption', function(event){
		event.preventDefault();
		showCoinConfig($(this).data('info'));
		$('#coinInfoBackground,#coinInfo').removeClass('hidden');
		$('#coinInfoBackground').addClass('display');
		return false;
	}).on('click', '#coinInfoBackground,#coinInfoClose', function(event){
		event.preventDefault();
		$('#coinInfoBackground,#coinInfo').addClass('hidden');
		$('#coinInfoBackground').removeClass('display');
		return false;
	});

	window.addEventListener('load', function() {
		setTimeout(function() {
			hotSwap(location.pathname.slice(1), false);
			window.addEventListener( 'popstate', function(e) {
				if (e.state && e.state['oldPage']) {
					hotSwap(e.state['oldPage'], false);
				}
			});
		}, 0);
	});

	window['statsSource'] = new EventSource("/api/live_stats");

	window['statsSource'].addEventListener('message', function (e) {
		var stats = JSON.parse(e['data']);
		for (algo in stats['algos']) {
			$('#statsMiners' + algo).text(stats['algos'][algo]['workers']);
			$('#statsHashrate' + algo).text(stats['algos'][algo]['hashrateString']);
		}
		for (var pool in stats['pools']) {
			$('#statsMiners' + pool).text(stats['pools'][pool]['workerCount']);
			$('#statsHashrate' + pool).text(stats['pools'][pool]['hashrateString']);
		}
	});

	nv.utils.windowResize(TriggerChartUpdates);

	$.getJSON('/api/pool_stats', function(data){
		statData = data;
		if ( currentPage === 'stats' ) {
			buildChartData();
			displayCharts();
		}
	});

	window['statsSource'].addEventListener('message', function(e){
		var stats = JSON.parse(e['data']);
		statData.push(stats);

		var newPoolAdded = (function(){
			for (var p in stats['pools']){
				if (!poolKeys || poolKeys.indexOf(p) === -1)
					return true;
			}
			return false;
		})();

		if (newPoolAdded || Object.keys(stats['pools']).length > poolKeys.length){
			if ( currentPage === 'stats' ) {
				buildChartData();
				displayCharts();
			}
		}
		else {
			var time = stats['time'] * 1000;
			for (var f = 0; f < poolKeys.length; f++) {
				var pool =  poolKeys[f];
				for (var i = 0; i < poolWorkerData.length; i++) {
					if (poolWorkerData[i]['key'] === pool) {
						poolWorkerData[i]['values'].shift();
						poolWorkerData[i]['values'].push([time, pool in stats['pools'] ? stats['pools'][pool]['workerCount'] : 0]);
						break;
					}
				}
				for (var i = 0; i < poolHashrateData.length; i++) {
					if (poolHashrateData[i]['key'] === pool) {
						poolHashrateData[i]['values'].shift();
						poolHashrateData[i]['values'].push([time, pool in stats['pools'] ? stats['pools'][pool]['hashrate'] : 0]);
						break;
					}
				}
				for (var i = 0; i < poolBlockData.length; i++) {
					if (poolBlockData[i]['key'] === pool) {
						poolBlockData[i]['values'].shift();
						poolBlockData[i]['values'].push([time, pool in stats['pools'] ? stats['pools'][pool]['blocks']['pending'] : 0]);
						break;
					}
				}
			}
			TriggerChartUpdates();
		}
	});
});
