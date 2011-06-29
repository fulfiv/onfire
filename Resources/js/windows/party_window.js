(function() {
  var fetchParties, getLocation, latitude, locationLabel, longitude, parties, refreshButton, refreshLocation, statusLabel, table, updatePartiesList, win;
  Ti.include("/js/helper/version.js");
  win = Titanium.UI.currentWindow;
  win.backgroundColor = '#fff';
  statusLabel = Titanium.UI.createLabel({
    color: '#999',
    text: 'This is the parties window',
    font: {
      fontSize: 20,
      fontFamily: 'Helvetica Neue'
    },
    textAlign: 'center',
    width: 'auto'
  });
  win.add(statusLabel);
  parties = [];
  table = Ti.UI.createTableView({
    data: parties,
    top: 60,
    left: 20,
    right: 20,
    height: 240,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#222'
  });
  win.add(table);
  refreshButton = Titanium.UI.createButton({
    title: 'Refresh',
    width: 200,
    height: 40,
    bottom: 20
  });
  refreshButton.addEventListener('click', function() {
    Ti.API.info('Click fired on refreshButton');
    if (Titanium.Platform.name !== 'android') {
      return fetchParties();
    } else {
      Ti.API.info('!= android');
      return refreshLocation();
    }
  });
  win.add(refreshButton);
  latitude = 48.69;
  longitude = 1.85;
  locationLabel = Titanium.UI.createLabel({
    text: 'Parties near ' + latitude + ', ' + longitude,
    top: 10,
    textAlign: 'center',
    width: 'auto',
    height: 'auto'
  });
  win.add(locationLabel);
  getLocation = function() {
    locationLabel.text = 'Parties near ' + latitude + ', ' + longitude;
    Ti.API.info('Got location, loading parties.');
    return fetchParties();
  };
  refreshLocation = function() {
    return getLocation();
  };
  updatePartiesList = function(partiesData) {
    var i, party, partyLabel, partyView, row, rowData, _ref, _results;
    rowData = [];
    _results = [];
    for (i = 0, _ref = partiesData.length - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
      party = partiesData[i];
      Ti.API.debug('Adding party ' + party.name);
      row = Titanium.UI.createTableViewRow({
        height: 'auto'
      });
      partyView = Titanium.UI.createView({
        height: 'auto',
        layout: 'vertical',
        top: 5,
        right: 5,
        bottom: 5,
        left: 5
      });
      partyLabel = Titanium.UI.createLabel({
        text: party.name + ' (' + party.latitude + ', ' + party.longitude + ')',
        height: 'auto',
        textAlign: 'left'
      });
      partyView.add(partyLabel);
      row.add(partyView);
      row.className = 'party' + party.id;
      rowData[i] = row;
      _results.push(table.data = rowData);
    }
    return _results;
  };
  fetchParties = function() {
    var xhr;
    xhr = Ti.Network.createHTTPClient();
    xhr.onload = function(e) {
      var partiesData;
      statusLabel.text = 'Success' + e;
      partiesData = JSON.parse(this.responseText);
      Ti.API.info(partiesData);
      return updatePartiesList(partiesData);
    };
    xhr.onerror = function(e) {
      statusLabel.text = 'Error:' + e;
      return Ti.API.error(e);
    };
    statusLabel.text = 'Loading parties...';
    if (latitude && longitude) {
      xhr.open('GET', 'http://onfire-server.herokuapp.com/parties.json?latitude=' + latitude + '&longitude=' + longitude);
    } else {
      xhr.open('GET', 'http://onfire-server.herokuapp.com/parties.json');
    }
    return xhr.send();
  };
  if (Titanium.Platform.name !== 'android') {
    refreshLocation();
  }
  win.addEventListener('open', function() {
    return statusLabel.text = 'Open fired';
  });
  win.addEventListener('focus', function() {
    Ti.API.info('Focus fired on Parties window');
    return statusLabel.text = 'Focus fired';
  });
  win.addEventListener('click', function() {
    return Ti.API.info('Click fired on Parties window');
  });
}).call(this);
