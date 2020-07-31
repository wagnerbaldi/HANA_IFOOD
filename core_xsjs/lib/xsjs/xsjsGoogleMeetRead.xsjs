/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeet\" order by \"c_time\", \"c_nextPageToken\", \"conference_id\" limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	var body = "";
	
	if ( offset === "0" ) {
		body = body + "conference_id" + "|" ;
		body = body + "c_time" + "|" ;
		body = body + "calendar_event_id" + "|" ;
		body = body + "c_email" + "|" ;
		body = body + "organizer_email" + "|" ;
		body = body + "display_name" + "|" ;
		body = body + "duration_seconds" + "|" ;
		body = body + "audio_recv_seconds" + "|" ;
		body = body + "audio_send_seconds" + "|" ;
		body = body + "video_recv_seconds" + "|" ;
		body = body + "video_send_seconds" + "|" ;
		body = body + "c_applicationName" + "|" ;
		body = body + "c_callerType" + "|" ;
		body = body + "c_customerId" + "|" ;
		body = body + "c_customerId2" + "|" ;
		body = body + "device_type" + "|" ;
		body = body + "end_of_call_rating" + "|" ;
		body = body + "identifier" + "|" ;
		body = body + "identifier_type" + "|" ;
		body = body + "location_country" + "|" ;
		body = body + "location_region" + "|" ;
		body = body + "c_nextPageToken" + "\n" ;
	}
		
	var numberReg = false;
	
	for(var lines of rs){
	
		numberReg = true ;
		
		body = body + lines.conference_id + "|" ;
		body = body + lines.c_time + "|" ;
		body = body + lines.calendar_event_id + "|" ;
		body = body + lines.c_email + "|" ;
		body = body + lines.organizer_email + "|" ;
		body = body + lines.display_name + "|" ;
		body = body + lines.duration_seconds + "|" ;
		body = body + lines.audio_recv_seconds + "|" ;
		body = body + lines.audio_send_seconds + "|" ;
		body = body + lines.video_recv_seconds + "|" ;
		body = body + lines.video_send_seconds + "|" ;
		body = body + lines.c_applicationName + "|" ;
		body = body + lines.c_callerType + "|" ;
		body = body + lines.c_customerId + "|" ;
		body = body + lines.c_customerId2 + "|" ;
		body = body + lines.device_type + "|" ;
		body = body + lines.end_of_call_rating + "|" ;
		body = body + lines.identifier + "|" ;
		body = body + lines.identifier_type + "|" ;
		body = body + lines.location_country + "|" ;
		body = body + lines.location_region + "|" ;
		body = body + lines.c_nextPageToken + "\n" ;   
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