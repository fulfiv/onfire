(function() {
  var authorization, buttonFire, buttonLabel, currentLocation, currentLocationLabel, getLocation, state, win;
  win = Ti.UI.currentWindow;
  if (win._root.Version.isIPhone3_2_Plus()) {
    Ti.Geolocation.purpose = "GPS demo";
  }
  Ti.Geolocation.preferredProvider = "gps";
  currentLocationLabel = Ti.UI.createLabel({
    text: 'Current Location (One Shot)',
    font: {
      fontSize: 12,
      fontWeight: 'bold'
    },
    color: '#111',
    top: 110,
    left: 10,
    height: 15,
    width: 300
  });
  win.add(currentLocationLabel);
  currentLocation = Ti.UI.createLabel({
    text: 'Current Location',
    font: {
      fontSize: 11
    },
    color: '#444',
    top: 130,
    left: 10,
    height: 15,
    width: 300
  });
  win.add(currentLocation);
  buttonFire = Titanium.UI.createButton({
    color: '#fff',
    backgroundImage: '/images/BUTT_grn_off.png',
    backgroundSelectedImage: '/images/BUTT_grn_on.png',
    backgroundDisabledImage: '/images/BUTT_drk_off.png',
    top: 300,
    width: 301,
    height: 57,
    font: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue'
    },
    title: 'Fire !'
  });
  buttonLabel = Titanium.UI.createLabel({
    color: '#f00',
    highlightedColor: '#0f0',
    backgroundColor: 'transparent',
    width: '100',
    height: 'auto',
    right: 5,
    text: 'Custom Label'
  });
  buttonFire.add(buttonLabel);
  state = 0;
  buttonFire.addEventListener('click', function() {
    buttonFire.enabled = false;
    buttonFire.title = 'I am Disabled';
    getLocation();
    return setTimeout(function() {
      buttonFire.enabled = true;
      return buttonFire.title = 'Fire again !';
    }, 2000);
  });
  win.add(buttonFire);
  if (Ti.Geolocation.locationServicesEnabled === false) {
    Ti.UI.createAlertDialog({
      title: 'On Fire',
      message: 'Your device has geo turned off - turn it on.'
    }).show();
  } else {
    if (Ti.Platform.name !== 'android') {
      authorization = Ti.Geolocation.locationServicesAuthorization;
      Ti.API.info('Authorization: ' + authorization);
      if (authorization === Ti.Geolocation.AUTHORIZATION_DENIED) {
        Ti.UI.createAlertDialog({
          title: 'On Fire',
          message: 'You have disallowed Titanium from running geolocation services.'
        }).show();
      } else if (authorization === Ti.Geolocation.AUTHORIZATION_RESTRICTED) {
        Ti.UI.createAlertDialog({
          title: 'On Fire',
          message: 'Your system has disallowed Titanium from running geolocation services.'
        }).show();
      }
    }
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
  }
  getLocation = function() {
    return Ti.Geolocation.getCurrentPosition(function(e) {
      var accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp;
      if (!e.success || e.error) {
        currentLocation.text = 'erreur: ' + JSON.stringify(e.error);
        return;
      }
      longitude = e.coords.longitude;
      latitude = e.coords.latitude;
      altitude = e.coords.altitude;
      heading = e.coords.heading;
      accuracy = e.coords.accuracy;
      speed = e.coords.speed;
      timestamp = e.coords.timestamp;
      altitudeAccuracy = e.coords.altitudeAccuracy;
      currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;
      return Ti.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
    });
  };
}).call(this);
