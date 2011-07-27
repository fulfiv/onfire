class GenericWindow
	constructor: (theTitle, theText, theUrl) ->
		test = "hell"
		@win  = Ti.UI.createWindow({
			title: theTitle, 
			backgroundColor: "#fff", 
			url: theUrl,
			_root: root})
		label = Ti.UI.createLabel({
			color: '#999',
			text: theText,
			font: {
				fontSize: 20,
				fontFamily: 'Helvetica Neue'
			},
			textAlign: 'center',
			width: 'auto'
		})
		@win.add(label)

root.GenericWindow = GenericWindow