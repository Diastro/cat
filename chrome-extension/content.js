var activity = {
	url : window.location.href,
  domain : document.domain,
  title : document.title,
  uri : document.documentURI,
  cookies : document.cookie,
	timestamp : new Date().getTime(),
	activityId : guid()
}

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

chrome.runtime.sendMessage(activity, function(response) {
  console.log("Activity processed.");
});
