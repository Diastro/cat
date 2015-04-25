chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	$.ajax({
	  type: "POST",
	  contentType: "application/json; charset=utf-8",
	  url: "http://192.168.1.121:5000/",
	  data: JSON.stringify(request),
	  success: function (data) {
	    console.log("Activity sent to tracking server.");
	  },
	  dataType: "json"
	});
});