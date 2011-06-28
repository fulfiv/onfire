win = Titanium.UI.currentWindow

Ti.include("/js/helper/version.js")
Ti.include("/js/helper/geolocation_helper.js")

# TODO include version.js not working => duplicating isIPhone3_2_Plus and translateErrorCode def code
isIPhone3_2_Plus = () ->
	# add iphone specific tests
	if Titanium.Platform.name == 'iPhone OS'
		version = Titanium.Platform.version.split "."
		major = parseInt version[0]
		minor = parseInt version[1]
		
		# can only test this support on a 3.2+ device
		return true if (major > 3 || (major == 3 && minor > 1))
	false

translateErrorCode = (code) ->
  if code == null
    null
  switch code
    when Ti.Geolocation.ERROR_LOCATION_UNKNOWN then "Location unknown"
    when Ti.Geolocation.ERROR_DENIED then "Access denied"
    when Ti.Geolocation.ERROR_NETWORK then "Network error"
    when Ti.Geolocation.ERROR_HEADING_FAILURE then "Failure to detect heading"
    when Ti.Geolocation.ERROR_REGION_MONITORING_DENIED then "Region monitoring access denied"
    when Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE then "Region monitoring access failure"
    when Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED then "Region monitoring setup delayed"

#NOTE: starting in 3.2+, you'll need to set the applications purpose property for using Location services on iPhone
Ti.Geolocation.purpose = "GPS demo" if isIPhone3_2_Plus()
Ti.Geolocation.preferredProvider = "gps"

currentLocationLabel = Ti.UI.createLabel
	text:'Current Location (One Shot)',
	font:{fontSize:12, fontWeight:'bold'},
	color:'#111',
	top:110,
	left:10,
	height:15,
	width:300

win.add currentLocationLabel

currentLocation = Ti.UI.createLabel
	text:'Current Location',
	font:{fontSize:11},
	color:'#444',
	top:130,
	left:10,
	height:15,
	width:300

win.add currentLocation

buttonFire = Titanium.UI.createButton
	color:'#fff',
	backgroundImage:'/images/BUTT_grn_off.png',
	backgroundSelectedImage:'/images/BUTT_grn_on.png',
	backgroundDisabledImage: '/images/BUTT_drk_off.png',
	top:300,
	width:301,
	height:57,
	font:{fontSize:20,fontWeight:'bold',fontFamily:'Helvetica Neue'},
	title:'Fire !'

buttonLabel = Titanium.UI.createLabel
	color:'#f00',
	highlightedColor:'#0f0',
	backgroundColor:'transparent',
	width:'100',
	height:'auto',
	right:5,
	text:'Custom Label'

buttonFire.add buttonLabel

state = 0

buttonFire.addEventListener('click', () ->
	buttonFire.enabled=false
	buttonFire.title = 'I am Disabled'
	
	getLocation()
	
	setTimeout(() ->
		buttonFire.enabled=true
		buttonFire.title = 'Fire again !'
	,2000)
)

win.add(buttonFire)

# SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
if (Ti.Geolocation.locationServicesEnabled==false)
	Ti.UI.createAlertDialog({title:'On Fire', message:'Your device has geo turned off - turn it on.'}).show()
else
#	if (Ti.Platform.name != 'android') {
#		authorization = Ti.Geolocation.locationServicesAuthorization
#		Ti.API.info('Authorization: '+authorization);
#		if (authorization == Ti.Geolocation.AUTHORIZATION_DENIED) {
#			Ti.UI.createAlertDialog({
#				title:'On Fire',
#				message:'You have disallowed Titanium from running geolocation services.'
#			}).show();
#		}
#		else if (authorization == Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
#			Ti.UI.createAlertDialog({
#				title:'On Fire',
#				message:'Your system has disallowed Titanium from running geolocation services.'
#			}).show();
#		}
#	}	

	# SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
	Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST

	# SET DISTANCE FILTER.  THIS DICTATES HOW OFTEN AN EVENT FIRES BASED ON THE DISTANCE THE DEVICE MOVES THIS VALUE IS IN METERS
	Ti.Geolocation.distanceFilter = 10

getLocation = () ->		
	# GET CURRENT POSITION
	Ti.Geolocation.getCurrentPosition (e) ->
		if (!e.success || e.error)
			currentLocation.text = 'error: ' + JSON.stringify(e.error)
			Ti.API.info("Code translation: "+translateErrorCode(e.code))
			alert('error ' + JSON.stringify(e.error))
			return

		longitude = e.coords.longitude
		latitude = e.coords.latitude
		altitude = e.coords.altitude
		heading = e.coords.heading
		accuracy = e.coords.accuracy
		speed = e.coords.speed
		timestamp = e.coords.timestamp
		altitudeAccuracy = e.coords.altitudeAccuracy
		
		currentLocation.text = 'long:' + longitude + ' lat: ' + latitude

		Ti.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy)