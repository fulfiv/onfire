translateErrorCode = (code) ->
  if code == null
    null
  switch code
    when Ti.Geolocation.ERROR_LOCATION_UNKNOWN then "Location unknown"
    when Ti.Geolocation.ERROR_DENIED then "Access denied"
    when Ti.Geolocation.ERROR_NETWORK then "Network error"
    when Ti.Geolocation.ERROR_HEADING_FAILURE then "Failure to detect heading"
    when Ti.Geolocation.ERROR_REGION_MONITORING_DENIED then "Region monitoring access denied"
    when Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE then "Region monitoring access failure"
    when Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED then "Region monitoring setup delayed"