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

var parties = [];
var table = Ti.UI.createTableView({
	data:parties,
	top:60,
	left:20,
	right:20,
	height:240,
	borderWidth:2,
	borderRadius:10,
	borderColor:'#222'
})
win.add(table);

var refreshButton = Titanium.UI.createButton({
	title:'Refresh',
	width:200,
	height:40,
	bottom:20
});

refreshButton.addEventListener('click', function()
{
	if (Titanium.Platform.name != 'android') {
		fetchParties();
	}
	else {
		refreshLocation();
	}
});
win.add(refreshButton);

var locationLabel = Titanium.UI.createLabel(
{
	text:'Parties near ' + latitude + ', ' + longitude,
	top:10,
	textAlign:'center',
	width:'auto',
	height:'auto'
});
win.add(locationLabel);

function refreshLocation(){
	getLocation(function()
	{
		locationLabel.text = 'Parties near ' + latitude + ', ' + longitude;
		Ti.API.info('Got location, loading parties.')
		fetchParties();
	});
}

function updatePartiesList(partiesData){
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

function fetchParties() {
	var xhr = Ti.Network.createHTTPClient();
		
	xhr.onload = function(e) {
		statusLabel.text = 'Success' + e;
		var partiesData = JSON.parse(this.responseText);
		Ti.API.info(partiesData);
		
		updatePartiesList(partiesData);
	};
	
	xhr.onerror = function(e) {
		statusLabel.text = 'Error:' + e;
		Ti.API.error(e);
	};
	
	statusLabel.text = 'Loading parties...';
	if (latitude && longitude) {
		xhr.open('GET','http://onfire-server.herokuapp.com/parties.json?latitude=' + latitude + '&longitude=' + longitude);
	}
	else {
		xhr.open('GET','http://onfire-server.herokuapp.com/parties.json');
	}
	xhr.send();
}

if (Titanium.Platform.name != 'android') {
	refreshLocation();
}

win.addEventListener('open', function()
{
	statusLabel.text = 'Open fired ';
});

win.addEventListener('focus', function()
{
	Ti.API.info('Focus fired on Parties window');
	statusLabel.text = 'Focus fired ';
});

win.addEventListener('click', function()
{
	Ti.API.info('Click fired on Parties window');
//	fetchParties();
})
