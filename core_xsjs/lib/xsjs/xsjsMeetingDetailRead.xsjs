/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::ZoomMeetingDetail\" order by \"UuID\" limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	var body = "";
	
	if ( offset === "0" ) {
		body = body + "UuID"	        	+ "|";
		body = body + "Id"		        	+ "|";
		body = body + "HostID"          	+ "|";
		body = body + "Type"            	+ "|";
		body = body + "Topic"       		+ "|";
		body = body + "UserName"        	+ "|";
		body = body + "UserEmail"       	+ "|";
		body = body + "StartTime"	    	+ "|";
		body = body + "EndTime"     		+ "|";
		body = body + "Duration"	    	+ "|";
		body = body + "TotalMinutes"      	+ "|";
		body = body + "ParticipantsCount" 	+ "\n";
	}
		
	var numberReg = false;
	
	for(var lines of rs){
	
		numberReg = true ;
		
		body = body + lines.UuID	           + "|";
		body = body + lines.Id		           + "|";
		body = body + lines.HostID             + "|";
		body = body + lines.Type               + "|";
		body = body + lines.Topic       	   + "|";
		body = body + lines.UserName           + "|";
		body = body + lines.UserEmail          + "|";
		body = body + lines.StartTime	       + "|";
		body = body + lines.EndTime     	   + "|";
		body = body + lines.Duration	       + "|";
		body = body + lines.TotalMinutes       + "|";
		body = body + lines.ParticipantsCount  + "\n";
	}
	
	if ( numberReg === true ) {
		$.response.contentType = "text/csv";
		$.response.setBody(body); 
		$.response.status = $.net.http.OK;
	} else {
		$.response.contentType = "text/plain";
		$.response.setBody("End"); 
		$.response.status = $.net.http.OK;		
	}

} catch (e) {
	var tobjerr = {};

	tobjerr.status = $.net.http.INTERNAL_SERVER_ERROR;
	tobjerr.message = e.message;
	tobjerr.description = e.message;

	$.response.contentType = "text/plain";
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody("End");
}