/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"INTEGRATION\".\"GoogleCalendar\" order by \"c_time\", \"c_nextPageToken\", \"calendar_id\" limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	var body = "";
	
	if ( offset === "0" ) {
		body = body + "calendar_id" + "|" ;
		body = body + "calendar_title" + "|" ;
		body = body + "c_time" + "|" ;
		body = body + "c_applicationName" + "|" ;
		body = body + "c_customerId" + "|" ;
		body = body + "c_email" + "|" ;
		body = body + "c_ownerDomain" + "|" ;
		body = body + "end_time" + "|" ;
		body = body + "event_guest" + "|" ;
		body = body + "event_id" + "|" ;
		body = body + "event_name" + "|" ;
		body = body + "event_response_status" + "|" ;
		body = body + "event_type" + "|" ;
		body = body + "grantee_email" + "|" ;
		body = body + "notification_message_id" + "|" ;
		body = body + "notification_method" + "|" ;
		body = body + "notification_type" + "|" ;
		body = body + "old_event_title" + "|" ;
		body = body + "organizer_calendar_id" + "|" ;
		body = body + "recipient_email" + "|" ;
		body = body + "start_time" + "|" ;
		body = body + "subscriber_calendar_id" + "|" ;
		body = body + "target_calendar_id" + "|" ;
		body = body + "time_proposal_change" + "|" ;
		body = body + "user_agent" + "|" ;
		body = body + "c_nextPageToken" + "\n" ;
	}
		
	var numberReg = false;
	
	for(var lines of rs){
	
		numberReg = true ;
		
		body = body + lines.calendar_id + "|" ;
		body = body + lines.calendar_title + "|" ;
		body = body + lines.c_time + "|" ;
		body = body + lines.c_applicationName + "|" ;
		body = body + lines.c_customerId + "|" ;
		body = body + lines.c_email + "|" ;
		body = body + lines.c_ownerDomain + "|" ;
		body = body + lines.end_time + "|" ;
		body = body + lines.event_guest + "|" ;
		body = body + lines.event_id + "|" ;
		body = body + lines.event_name + "|" ;
		body = body + lines.event_response_status + "|" ;
		body = body + lines.event_type + "|" ;
		body = body + lines.grantee_email + "|" ;
		body = body + lines.notification_message_id + "|" ;
		body = body + lines.notification_method + "|" ;
		body = body + lines.notification_type + "|" ;
		body = body + lines.old_event_title + "|" ;
		body = body + lines.organizer_calendar_id + "|" ;
		body = body + lines.recipient_email + "|" ;
		body = body + lines.start_time + "|" ;
		body = body + lines.subscriber_calendar_id + "|" ;
		body = body + lines.target_calendar_id + "|" ;
		body = body + lines.time_proposal_change + "|" ;
		body = body + lines.user_agent + "|" ;
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