// Check server status onStart
heartbeat();

// Server heartbeat
setInterval(function(){
	heartbeat();
}, 5000);

// Content script listener
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	chrome.browserAction.setIcon({
		path: "images/request.png",
	});
	$.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "http://192.168.1.121:5000/",
		data: JSON.stringify(request),
		dataType: "json",
		statusCode: {
			200: function (response) {
				setTimeout(function() {
					chrome.extension.getBackgroundPage().console.log("Activity sent to tracking server.");
					chrome.browserAction.setIcon({
						path: "images/" + currentServerStatus + ".png",
					});
				}, 500);
			}
		},
		error: function(status, error) {
			chrome.extension.getBackgroundPage().console.log("ERROR." + status + " " + error);
			toggleState("offline");
		}
	});
});

// Server status change notification (offline/online)
var currentServerStatus = "";
function toggleState(status){
	if(currentServerStatus != status){
		var imgPath = "images/" + status + ".png"
		var statusUpper = status.substr(0, 1).toUpperCase() + status.substr(1);
		var readableStatus = "Chrome activity tracker server is " + status
		var notificationType = "basic";

		chrome.extension.getBackgroundPage().console.log(readableStatus);
		chrome.browserAction.setIcon({
			path: imgPath,
		});
		chrome.notifications.create(guid(), {
			iconUrl: imgPath,
			message: readableStatus,
			title: statusUpper,
			type: notificationType
		});

		currentServerStatus = status;
	}
};

// Heartbeat check
function heartbeat(){
	$.ajax({
		url: "http://192.168.1.121:5000/heartbeat",
		type: "GET",
		statusCode: {
			200: function (response) {
				toggleState("online");
			}
		},
		error: function(data) {
			toggleState("offline");
		}
	});
};

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

/*
//Test Code
chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.extension.getBackgroundPage().console.debug(details);
    $.ajax({
		type: "POST",
		contentType: "application/json; charset=utf-8",
		url: "http://192.168.1.121:5000/raw",
		data: JSON.stringify(details),
		dataType: "json",
		statusCode: {
			200: function (response) {
				setTimeout(function() {
					chrome.extension.getBackgroundPage().console.log("Activity sent to tracking server.");
					chrome.browserAction.setIcon({
						path: "images/" + currentServerStatus + ".png",
					});
				}, 500);
			}
		},
		error: function(status, error) {
			chrome.extension.getBackgroundPage().console.log("ERROR." + status + " " + error);
			toggleState("offline");
		}
	});
}, {
    urls: ["<all_urls>"]
});
*/