var win = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';

var statusLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'This is the parties window',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	top:300,
	width:'auto'
});
win.add(statusLabel);

var partiesLabel = Titanium.UI.createLabel({
	text:''
});
win.add(partiesLabel);

function fetchParties() {
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function(e) {
		statusLabel.text = 'Success' + e;
		var partiesData = JSON.parse(this.responseText);
		
		partiesLabel.text=partiesData;
	};
	
	xhr.onerror = function(e) {
		statusLabel.text = 'Error:' + e;
	};
	
	statusLabel.text = 'Loading parties...';
	xhr.open('GET','http://onfire-server.herokuapp.com/parties.json');
	xhr.send();
}

win.addEventListener('open', function()
{
	statusLabel.text = 'Open fired ';
});

win.addEventListener('focus', function()
{
	statusLabel.text = 'Focus fired ';
	fetchParties();
});
