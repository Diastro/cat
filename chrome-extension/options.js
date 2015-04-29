function save_options() {
  var serverinfo = document.getElementById('serverinfo').value;
  if (serverinfo.indexOf("http://") !== 0) {
    serverinfo = "http://" + serverinfo;
  }
  chrome.storage.sync.set({serverinfo : serverinfo}, function() {
    chrome.runtime.sendMessage({type : "forceHeartbeat"});
    var status = document.getElementById('status');
    document.getElementById('save').textContent = "Saved!";
    setTimeout(function() {document.getElementById('save').textContent = "Save";}, 1200);
  });
}

function restore_options() {
  chrome.storage.sync.get({serverinfo: 'http://127.0.0.1:5000'}, function(items) {
    document.getElementById('serverinfo').value = items.serverinfo;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);