"use strict";
var output = [] ;


try {
	var conn = $.hdb.getConnection();
	var query = 'select top 1 "StartTime" from  \"INTEGRATION\".\"ZoomMeetingDetail\" order by "StartTime" desc';
	var rs = conn.executeQuery(query);
	
	for ( var line of rs ) {
		var c_time = line.StartTime;
	}
	conn.close();
	
	$.response.contentType = "text/plain";
	$.response.setBody(c_time); 
	$.response.status = $.net.http.OK;

} catch (e) {
	var tobjerr = {};

	tobjerr.status = $.net.http.INTERNAL_SERVER_ERROR;
	tobjerr.message = e.message;
	tobjerr.description = e.message;

	$.response.contentType = "text/plain";
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}