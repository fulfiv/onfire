var win = Titanium.UI.currentWindow;
win.backgroundColor = '#fff';

Ti.include("version.js");

Ti.Geolocation.preferredProvider = "gps";

if (isIPhone3_2_Plus())
{
	//NOTE: starting in 3.2+, you'll need to set the applications
	//purpose property for using Location services on iPhone
	Ti.Geolocation.purpose = "GPS demo";
}

function translateErrorCode(code) {
	if (code == null) {
		return null;
	}
	switch (code) {
		case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
			return "Location unknown";
		case Ti.Geolocation.ERROR_DENIED:
			return "Access denied";
		case Ti.Geolocation.ERROR_NETWORK:
			return "Network error";
		case Ti.Geolocation.ERROR_HEADING_FAILURE:
			return "Failure to detect heading";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
			return "Region monitoring access denied";
		case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
			return "Region monitoring access failure";
		case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
			return "Region monitoring setup delayed";
	}
}

var currentLocationLabel = Titanium.UI.createLabel({
	text:'Current Location (One Shot)',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#111',
	top:110,
	left:10,
	height:15,
	width:300
});
win.add(currentLocationLabel);

var currentLocation = Titanium.UI.createLabel({
	text:'Current Location',
	font:{fontSize:11},
	color:'#444',
	top:130,
	left:10,
	height:15,
	width:300
});
win.add(currentLocation);

var updatedLocationLabel = Titanium.UI.createLabel({
	text:'Updated Location',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#111',
	top:150,
	left:10,
	height:15,
	width:300
});
win.add(updatedLocationLabel);

var updatedLocation = Titanium.UI.createLabel({
	text:'Updated Location not fired',
	font:{fontSize:11},
	color:'#444',
	top:170,
	left:10,
	height:15,
	width:300
});
win.add(updatedLocation);

var updatedLatitude = Titanium.UI.createLabel({
	text:'',
	font:{fontSize:11},
	color:'#444',
	top:190,
	left:10,
	height:15,
	width:300
});
win.add(updatedLatitude);

var updatedLocationAccuracy = Titanium.UI.createLabel({
	text:'',
	font:{fontSize:11},
	color:'#444',
	top:210,
	left:10,
	height:15,
	width:300
});
win.add(updatedLocationAccuracy);

var updatedLocationTime = Titanium.UI.createLabel({
	text:'',
	font:{fontSize:11},
	color:'#444',
	top:230,
	left:10,
	height:15,
	width:300
});
win.add(updatedLocationTime);

var buttonFire = Titanium.UI.createButton({
	color:'#fff',
	backgroundImage:'../images/BUTT_grn_off.png',
	backgroundSelectedImage:'../images/BUTT_grn_on.png',
	backgroundDisabledImage: '../images/BUTT_drk_off.png',
	top:300,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Fire !'
});

var buttonLabel = Titanium.UI.createLabel({
	color:'#f00',
	highlightedColor:'#0f0',
	backgroundColor:'transparent',
	width:'100',
	height:'auto',
	right:5,
	text:'Custom Label'
});

buttonFire.add(buttonLabel);

var state = 0;
buttonFire.addEventListener('click', function()
{
	buttonFire.enabled=false;
	buttonFire.title = 'I am Disabled';
	
	getLocation();
	
	setTimeout(function()
	{
		buttonFire.enabled=true;
		buttonFire.title = 'Fire again !';
	},2000);
});

win.add(buttonFire);

// state vars used by resume/pause
var headingAdded = false;
var locationAdded = false;

//
//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
//
if (Titanium.Geolocation.locationServicesEnabled==false)
{
	Titanium.UI.createAlertDialog({title:'On Fire', message:'Your device has geo turned off - turn it on.'}).show();
}
else
{
	if (Titanium.Platform.name != 'android') {
		var authorization = Titanium.Geolocation.locationServicesAuthorization
		Ti.API.info('Authorization: '+authorization);
		if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
			Ti.UI.createAlertDialog({
				title:'On Fire',
				message:'You have disallowed Titanium from running geolocation services.'
			}).show();
		}
		else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
			Ti.UI.createAlertDialog({
				title:'On Fire',
				message:'Your system has disallowed Titanium from running geolocation services.'
			}).show();
		}
	}

	//
	//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	//
	// Titanium.Geolocation.ACCURACY_BEST
	// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
	// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
	// Titanium.Geolocation.ACCURACY_KILOMETER
	// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
	//
	Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;

	//
	//  SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES
	//  THIS VALUE IS IN METERS
	//
	Titanium.Geolocation.distanceFilter = 10;

	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			currentLocation.text = 'error: ' + JSON.stringify(e.error);
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
			alert('error ' + JSON.stringify(e.error));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		Ti.API.info('speed ' + speed);
		currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	});

	//
	// EVENT LISTENER FOR GEO EVENTS - THIS WILL FIRE REPEATEDLY (BASED ON DISTANCE FILTER)
	//
	var locationCallback = function(e)
	{
		if (!e.success || e.error)
		{
			updatedLocation.text = 'error:' + JSON.stringify(e.error);
			updatedLatitude.text = '';
			updatedLocationAccuracy.text = '';
			updatedLocationTime.text = '';
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;

		//Titanium.Geolocation.distanceFilter = 100; //changed after first location event

		updatedLocation.text = 'long:' + longitude;
		updatedLatitude.text = 'lat: '+ latitude;
		updatedLocationAccuracy.text = 'accuracy:' + accuracy;
		updatedLocationTime.text = 'timestamp:' +new Date(timestamp);

		updatedLatitude.color = 'red';
		updatedLocation.color = 'red';
		updatedLocationAccuracy.color = 'red';
		updatedLocationTime.color = 'red';
		setTimeout(function()
		{
			updatedLatitude.color = '#444';
			updatedLocation.color = '#444';
			updatedLocationAccuracy.color = '#444';
			updatedLocationTime.color = '#444';

		},100);

		Titanium.API.info('geo - location updated: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	};
	Titanium.Geolocation.addEventListener('location', locationCallback);
	locationAdded = true;
}

function getLocation()
 {	
	
	//
	// GET CURRENT POSITION
	//
	Titanium.Geolocation.getCurrentPosition(function(e)
	{
		if (!e.success || e.error)
		{
			currentLocation.text = 'error: ' + JSON.stringify(e.error);
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
			alert('error ' + JSON.stringify(e.error));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		Ti.API.info('speed ' + speed);
		currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	});	
}

if (Titanium.Platform.name == 'android')
{
	//  as the destroy handler will remove the listener, only set the pause handler to remove if you need battery savings
	Ti.Android.currentActivity.addEventListener('pause', function(e) {
		Ti.API.info("pause event received");
		if (locationAdded) {
			Ti.API.info("removing location callback on pause");
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			locationAdded = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('destroy', function(e) {
		Ti.API.info("destroy event received");
		if (locationAdded) {
			Ti.API.info("removing location callback on destroy");
			Titanium.Geolocation.removeEventListener('location', locationCallback);
			locationAdded = false;
		}
	});
	Ti.Android.currentActivity.addEventListener('resume', function(e) {
		Ti.API.info("resume event received");
		if (!locationAdded) {
			Ti.API.info("adding location callback on resume");
			Titanium.Geolocation.addEventListener('location', locationCallback);
			locationAdded = true;
		}
	});
}