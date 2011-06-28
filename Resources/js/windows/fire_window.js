(function() {
  var buttonFire, buttonLabel, currentLocation, currentLocationLabel, getLocation, isIPhone3_2_Plus, state, translateErrorCode, win;
  win = Titanium.UI.currentWindow;
  Ti.include("/js/helper/version.js");
  Ti.include("/js/helper/geolocation_helper.js");
  isIPhone3_2_Plus = function() {
    var major, minor, version;
    if (Titanium.Platform.name === 'iPhone OS') {
      version = Titanium.Platform.version.split(".");
      major = parseInt(version[0]);
      minor = parseInt(version[1]);
      if (major > 3 || (major === 3 && minor > 1)) {
        return true;
      }
    }
    return false;
  };
  translateErrorCode = function(code) {
    if (code === null) {
      null;
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
  };
  if (isIPhone3_2_Plus()) {
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
    Ti.Geolocation.accuracy = Ti.Geolocation.ACCURACY_BEST;
    Ti.Geolocation.distanceFilter = 10;
  }
  getLocation = function() {
    return Ti.Geolocation.getCurrentPosition(function(e) {
      var accuracy, altitude, altitudeAccuracy, heading, latitude, longitude, speed, timestamp;
      if (!e.success || e.error) {
        currentLocation.text = 'error: ' + JSON.stringify(e.error);
        Ti.API.info("Code translation: " + translateErrorCode(e.code));
        alert('error ' + JSON.stringify(e.error));
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
