#this sets²& the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor '#000'

# create tab group
main_tabgroup = Ti.UI.createTabGroup()

#create fire_window
root.fire_window = new root.GenericWindow('Set Fire', '', 'js/windows/fire_window.js')
fire_tab = Ti.UI.createTab  
    icon: 'images/KS_nav_views.png',
    title: 'Set Fire',
    window: root.fire_window.win

#create party_window
root.party_window = new root.GenericWindow('Parties', '', 'js/windows/party_window.js')
party_tab = Ti.UI.createTab
	icon: 'images/KS_nav_views.png',
	title: 'Parties',
	window: root.party_window.win

# add tabs
main_tabgroup.addTab fire_tab
main_tabgroup.addTab party_tab

#main_tabgroup.addEventListener 'focus', (e) ->
#	setTimeout(Ti.API.info('tab changed to ' + e.tab.title),100)
	#{}if (e.tab.title == 'Parties')

# open tab group
main_tabgroup.open()