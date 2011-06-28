# returns true if iphone/ipad and version is 3.2+
isIPhone3_2_Plus = () ->
	# add iphone specific tests
	if Titanium.Platform.name == 'iPhone OS'
		version = Titanium.Platform.version.split "."
		major = parseInt version[0]
		minor = parseInt version[1]
		
		# can only test this support on a 3.2+ device
		return true if (major > 3 || (major == 3 && minor > 1))
	false

isiOS4Plus = () ->
	# add iphone specific tests
	if Titanium.Platform.name == 'iPhone OS'
		version = Titanium.Platform.version.split "."
		major = parseInt version[0]
		
		# can only test this support on a 3.2+ device
		return true if (major >= 4)
	false