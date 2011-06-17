Ti.include("location.js");

var win = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';

var statusLabel = Titanium.UI.createLabel({
	color:'#999',
	text:'This is the parties window',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});
//win.add(statusLabel);

var locationText = 'Location: ' + latitude + ', ' + longitude;
var locationLabel = Titanium.UI.createLabel(
{
	text:locationText
})
//win.add(locationLabel);

var partiesLabel = Titanium.UI.createLabel({
	text:''
});
//win.add(partiesLabel);

var parties = [];
var table = Ti.UI.createTableView({
	data:parties,
//	headerView:locationLabel,
//	footerView:statusLabel
})
win.add(table);

function fetchParties() {
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function(e) {
		statusLabel.text = 'Success' + e;
		var partiesData = JSON.parse(this.responseText);
		Ti.API.debug(partiesData);
		
		var rowData = [];
		for (var i = 0; i < partiesData.length; i++){
			var party = partiesData[i];
			Ti.API.debug('Adding party ' + party.name);
			var row = Titanium.UI.createTableViewRow({height:'auto'});
			var partyView = Titanium.UI.createView({ height:'auto', layout:'vertical', top:5, right:5, bottom:5, left:5 });
			var partyLabel = Titanium.UI.createLabel(
				{
					text:party.name + ' (' + party.latitude + ', ' + party.longitude + ')',
					height:'auto',
					textAlign:'left'
				});
			partyView.add(partyLabel);
			row.add(partyView);
			row.className = 'party' + party.id;
			rowData[i] = row;
			table.data = rowData;
		};
	};
	
	xhr.onerror = function(e) {
		statusLabel.text = 'Error:' + e;
	};
	
	statusLabel.text = 'Loading parties...';
	xhr.open('GET','http://onfire-server.herokuapp.com/parties.json?latitude=' + latitude + '&longitude=' + longitude);
	xhr.send();
}

win.addEventListener('open', function()
{
	statusLabel.text = 'Open fired ';
});

win.addEventListener('focus', function()
{
	Ti.API.info('Focus fired on Parties window');
	statusLabel.text = 'Focus fired ';
	fetchParties();
});

win.addEventListener('click', function()
{
	Ti.API.info('Click fired on Parties window');
//	fetchParties();
})
