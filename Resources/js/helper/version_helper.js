(function() {
  var Version;
  Version = (function() {
    function Version() {}
    Version.hello = "hello world";
    Version.isIPhone3_2_Plus = function() {
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
    Version.isiOS4Plus = function() {
      var major, version;
      if (Titanium.Platform.name === 'iPhone OS') {
        version = Titanium.Platform.version.split(".");
        major = parseInt(version[0]);
        if (major >= 4) {
          return true;
        }
      }
      return false;
    };
    return Version;
  })();
  root.Version = Version;
}).call(this);