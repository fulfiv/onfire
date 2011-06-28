(function() {
  var fire_tab, main_tabgroup, party_tab;
  Titanium.UI.setBackgroundColor('#000');
  main_tabgroup = Titanium.UI.createTabGroup();
  root.fire_window = new root.GenericWindow('Set Fire', '', 'js/windows/fire_window.js');
  fire_tab = Titanium.UI.createTab({
    icon: 'images/KS_nav_views.png',
    title: 'Set Fire',
    window: root.fire_window.win
  });
  root.party_window = new root.GenericWindow('Parties', '', 'js/windows/party_window.js');
  party_tab = Titanium.UI.createTab({
    icon: 'images/KS_nav_views.png',
    title: 'Parties',
    window: root.party_window.win
  });
  main_tabgroup.addTab(fire_tab);
  main_tabgroup.addTab(party_tab);
  main_tabgroup.addEventListener('focus', function(e) {
    setTimeout(Ti.API.info('tab changed to ' + e.tab.title), 100);
    if (e.tab.title === 'Parties') {
      return {};
    }
  });
  main_tabgroup.open();
}).call(this);
