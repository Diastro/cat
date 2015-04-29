// Check server status onStart
heartbeat();

// Server heartbeat
setInterval(function(){
	heartbeat();
}, 5000);

// Content script listener
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(request.type == "activity"){
		chrome.browserAction.setIcon({
			path: "images/request.png",
		});
		chrome.storage.sync.get({serverinfo: 'http://127.0.0.1:5000'}, function(info){
			$.ajax({
				type: "POST",
				contentType: "application/json; charset=utf-8",
				url: info.serverinfo,
				data: JSON.stringify(request.data),
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
  	}
  	if(request.type == "forceHeartbeat"){
  		heartbeat();
  		chrome.extension.getBackgroundPage().console.log("Forcing heartbeat check.");
  	}
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

// Heartbeat
function heartbeat(){
	chrome.storage.sync.get({serverinfo: 'http://127.0.0.1:5000'}, function(info){
		$.ajax({
			url: info.serverinfo + "/heartbeat",
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
	});
};

// Util
// from : https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
