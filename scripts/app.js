$(document).ready(function() {	
	var $form        = $("#dw-log-form");
	var $addMoreLogs = $(".add-more-logs");
	var $submitLogs  = $(".submit-logs");
	var $clearLogs   = $(".clear-logs");
	var $input       = $("input:file");
	var logNumber    = 1;

	//On file input change read the log file and store the data to session storage
	$input.change(function(){
		var input   = this;
		var logFile = input.files[0];
		readLogFile(input, logFile)
	});

	//On form submit search the logs for the keyword entered in the search field
	$submitLogs.click(function(event){
		event.preventDefault();
		searchLogs();
	})

	//Function uses FileReader to read through the xml file and store it in session
	function readLogFile(input, logFile){
			var inputName = input.className;
			var reader    = new FileReader();
			reader.readAsText(logFile);
			reader.onload = function(){
				var data = reader.result;
				sessionStorage.setItem(inputName, data)
			}
	}

	//Function loops through the stored session log data and turns the keyword entered into a regex that we match against
	function searchLogs(){
		var searchTerm = document.getElementById('search').value
		var storedLogs = sessionStorage
		var storedLogNumber = sessionStorage.length;
		for(var i = storedLogNumber; i != 0; i -= 1){
			var regex = new RegExp(searchTerm, "gim");
			var currentLog = "log-file-" + i;
			var logData = storedLogs.getItem(currentLog);
			var match = logData.match(regex);
			var $searchOutput = $(".output-" + i)
			clearOutput($searchOutput);
			if(match == null || undefined || 0){
				var matchNotFound = searchTerm + " not found in " + currentLog;
				$searchOutput.append(matchNotFound);
			}
			else if (match.length == 1){
				var matchFound = searchTerm + " found " + match.length + " time in " + currentLog;
				$searchOutput.append(matchFound)
			}
			else{
				var matchFound = searchTerm + " found " + match.length + " times in " + currentLog;
				$searchOutput.append(matchFound)
			}
		}
	}

	//Function clears appended content from search-output
	function clearOutput(output){
		output.html("")
	}

	//On click of the clear logs button refresh the page and clear all logs stored in session
	$clearLogs.click(function(event){
		event.preventDefault();
		location.reload();
		sessionStorage.clear();

	})

});