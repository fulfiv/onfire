Ti.include("/js/helper/version.js")

win = Titanium.UI.currentWindow
win.backgroundColor = '#fff'

statusLabel = Titanium.UI.createLabel
	color:'#999',
	text:'This is the parties window',
	font:{fontSize:20,fontFamily:'Helvetica Neue'},
	textAlign:'center',
	width:'auto'

win.add(statusLabel);

parties = []
table = Ti.UI.createTableView
	data:parties,
	top:60,
	left:20,
	right:20,
	height:240,
	borderWidth:2,
	borderRadius:10,
	borderColor:'#222'

win.add table

refreshButton = Titanium.UI.createButton
	title:'Refresh',
	width:200,
	height:40,
	bottom:20

refreshButton.addEventListener('click', () ->
	Ti.API.info('Click fired on refreshButton')
	if (Titanium.Platform.name != 'android') 
		fetchParties()
	else
		Ti.API.info('!= android')
		refreshLocation()
)
win.add refreshButton

latitude = 48.69
longitude = 1.85

locationLabel = Titanium.UI.createLabel
	text:'Parties near ' + latitude + ', ' + longitude,
	top:10,
	textAlign:'center',
	width:'auto',
	height:'auto'

win.add locationLabel

getLocation = () ->
	locationLabel.text = 'Parties near ' + latitude + ', ' + longitude
	#TODO get Real Location by calling getLocation like in fire_window
	Ti.API.info('Got location, loading parties.')
	fetchParties()

refreshLocation = () ->
	getLocation()
	

updatePartiesList = (partiesData) ->
	rowData = []
	for i in [0..partiesData.length-1]
		party = partiesData[i]
		Ti.API.debug('Adding party ' + party.name)
		row = Titanium.UI.createTableViewRow({height:'auto'})
		partyView = Titanium.UI.createView({ height:'auto', layout:'vertical', top:5, right:5, bottom:5, left:5 })
		partyLabel = Titanium.UI.createLabel
			text:party.name + ' (' + party.latitude + ', ' + party.longitude + ')',
			height:'auto',
			textAlign:'left'
		partyView.add partyLabel
		row.add partyView
		row.className = 'party' + party.id
		rowData[i] = row
		table.data = rowData

fetchParties = () ->
	xhr = Ti.Network.createHTTPClient()
		
	xhr.onload = (e) ->
		statusLabel.text = 'Success' + e
		partiesData = JSON.parse(this.responseText)
		Ti.API.info(partiesData)
		
		updatePartiesList(partiesData)
	
	xhr.onerror = (e) ->
		statusLabel.text = 'Error:' + e
		Ti.API.error(e)
	
	statusLabel.text = 'Loading parties...'
	if (latitude && longitude)
		xhr.open('GET','http://onfire-server.herokuapp.com/parties.json?latitude=' + latitude + '&longitude=' + longitude)
	else
		xhr.open('GET','http://onfire-server.herokuapp.com/parties.json')
	xhr.send()

if (Titanium.Platform.name != 'android') 
	refreshLocation()

win.addEventListener 'open', () ->
	statusLabel.text = 'Open fired'

win.addEventListener 'focus', () ->
	Ti.API.info('Focus fired on Parties window')
	statusLabel.text = 'Focus fired'

win.addEventListener 'click', () ->
	Ti.API.info('Click fired on Parties window')