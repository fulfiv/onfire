(function() {
  var GenericWindow;
  GenericWindow = (function() {
    function GenericWindow(theTitle, theText, theUrl) {
      var label, test;
      test = "hell";
      this.win = Ti.UI.createWindow({
        title: theTitle,
        backgroundColor: "#fff",
        url: theUrl,
        _root: root
      });
      label = Ti.UI.createLabel({
        color: '#999',
        text: theText,
        font: {
          fontSize: 20,
          fontFamily: 'Helvetica Neue'
        },
        textAlign: 'center',
        width: 'auto'
      });
      this.win.add(label);
    }
    return GenericWindow;
  })();
  root.GenericWindow = GenericWindow;
}).call(this);
