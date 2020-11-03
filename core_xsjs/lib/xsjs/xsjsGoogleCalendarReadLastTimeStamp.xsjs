/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var conn = $.hdb.getConnection();
	var query = `select top 1 "c_time" from "INTEGRATION"."GoogleCalendar" order by "c_time" desc`;
	var rs = conn.executeQuery(query);
	
	for ( var line of rs ) {
		var c_time = line.c_time;
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