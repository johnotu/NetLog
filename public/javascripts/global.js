var logListData = [];
var searchListData = [];


$(document).ready(function(){
	populateTable();
	$('button#btnAddLog').on('click', addLog);
	$('button#btnSearchLog').on('click', function(){
		addSearch(logListData);
		var searchtablecontent = '';
		$.each(searchListData, function(){
			searchtablecontent += '<tr>';
			searchtablecontent += '<td>' + this.date + '</td>';
			searchtablecontent += '<td>' + this.reporter + '</td>';
			searchtablecontent += '<td>' + this.office + '</td>';
			searchtablecontent += '<td>' + this.floor + '</td>';
			searchtablecontent += '<td>' + this.devicetype + '</td>';
			searchtablecontent += '<td>' + this.devicename + '</td>';
			searchtablecontent += '<td>' + this.deviceid + '</td>';
			searchtablecontent += '<td>' + this.complaint + '</td>';
			searchtablecontent += '<td>' + this.logcreatedby + '</td>';
			searchtablecontent += '<td>' + this.workdone + '</td>';
			searchtablecontent += '<td>' + this.jobstatus + '</td>';
			searchtablecontent += '</tr>';
		});
		$('#searchtable').html(searchtablecontent);
		searchtablecontent = '';
		searchListData = [];
	});
});

function populateTable(){
	var tableContent = '';
	$.getJSON('/log/loglist', function(data){
		logListData = data;
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.date + '</td>';
			tableContent += '<td>' + this.reporter + '</td>';
			tableContent += '<td>' + this.office + '</td>';
			tableContent += '<td>' + this.floor + '</td>';
			tableContent += '<td>' + this.devicetype + '</td>';
			tableContent += '<td>' + this.devicename + '</td>';
			tableContent += '<td>' + this.deviceid + '</td>';
			tableContent += '<td>' + this.complaint + '</td>';
			tableContent += '<td>' + this.logcreatedby + '</td>';
			tableContent += '<td>' + this.workdone + '</td>';
			tableContent += '<td>' + this.jobstatus + '</td>';
			tableContent += '</tr>';
		});
		$('tbody#logtable').html(tableContent);
	});
	
}

// to populate search table
function populateSearchTable(){
	var tableContent = '';
	$.getJSON('/log/searchlog', function(data){
		searchListData = data;
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.date + '</td>';
			tableContent += '<td>' + this.reporter + '</td>';
			tableContent += '<td>' + this.office + '</td>';
			tableContent += '<td>' + this.floor + '</td>';
			tableContent += '<td>' + this.devicetype + '</td>';
			tableContent += '<td>' + this.devicename + '</td>';
			tableContent += '<td>' + this.deviceid + '</td>';
			tableContent += '<td>' + this.complaint + '</td>';
			tableContent += '<td>' + this.logcreatedby + '</td>';
			tableContent += '<td>' + this.workdone + '</td>';
			tableContent += '<td>' + this.jobstatus + '</td>';
			tableContent += '</tr>';
		});
		$('tbody#logtable').html(tableContent);
	});
	
}



function getdate(){
	var date = new Date();
	var getmonth = 1+date.getMonth();
	return date.getDate()+'-'+getmonth+'-'+date.getFullYear();
}

function addLog(){
	event.preventDefault();

	var errorCount = 0;
	$('#addLog input').each(function(index, val){
		if($(this).val() === '') {
			errorCount++;
		}
	});
	if(errorCount === 0){
		var logdate = getdate();
		var newLog = {
			'date': logdate,
			'reporter':$('input#inputReporter').val(),
			'office':$('input#inputOffice').val(),
			'floor':$('select#inputFloor').val(),
			'devicetype':$('select#inputDevicetype').val(),
			'devicename':$('input#inputDevicename').val(),
			'deviceid':$('input#inputDeviceid').val(),
			'complaint':$('textarea#inputComplaint').val(),
			'logcreatedby':$('input#inputLogcreatedby').val(),
			'workdone':$('textarea#inputWorkdone').val(),
			'jobstatus':$('select#inputJobstatus').val()
		};
		$.ajax({
			type: 'POST',
			data: newLog,
			url: '/log/addlog',
			dataType: 'JSON'
		}).done(function(response){
			if(response.msg === ''){
				$('#addLog input').val('');
				$('#addlog textarea').val('');
				populateTable();
			}
			else{
				alert('Error: '+response.msg);
			}
		});
	}
	else{
		alert('Please complete all fields');
		return false;
	}
}


function addSearch(ar){
	
	var searchcat = $('select#searchCat').val();
	var searchitem = $('input#searchItem').val();
	var arlen = ar.length;

	for(var i=0; i<arlen; i++){
		if(ar[i][searchcat] === searchitem){
			searchListData.push(ar[i]);
		}
	}

		
}