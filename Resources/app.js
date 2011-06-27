// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();

//
// create base UI tab and root window
//
var win1 = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#000',
    url:'geolocation.js'
});

var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Set Fire',
    window:win1
});

//
// create controls tab and root window
//
var win2 = Titanium.UI.createWindow({  
    title:'Fire Map',
    backgroundColor:'#fff'
});
var tab2 = Titanium.UI.createTab({  
    icon:'KS_nav_ui.png',
    title:'Fire Map',
    window:win2
});

var label2 = Titanium.UI.createLabel({
	color:'#999',
	text:'Were is fire ?',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'
});

win2.add(label2);

var partyWindow = Titanium.UI.createWindow({
	title:'Parties',
	url:'windows/party_window.js'
});

var partyTab = Titanium.UI.createTab({
	icon:'KS_nav_views.png',
	title:'Parties',
	window:partyWindow
});

//
//  add tabs
//
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
tabGroup.addTab(partyTab);

tabGroup.addEventListener('focus', function(e)
{
	setTimeout(function()
	    {       
	        Ti.API.info('tab changed to ' + e.tab.title);
	    },100);
	if (e.tab.title == 'Parties') {
		
	}
});

// open tab group
tabGroup.open();