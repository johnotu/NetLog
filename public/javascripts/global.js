var logListData = [];


$(document).ready(function(){
	populateTable();
	$('button#btnAddLog').on('click', addLog);
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