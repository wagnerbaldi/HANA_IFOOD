
var header_ctime = $.request.headers.get('c_time');

try {
	var conn = $.db.getConnection();
	
	//Delete duplicate timestamp records
	var sqldele = "DELETE FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\" where \"c_time\" <= '" + header_ctime + "'" ;
	var stdel = conn.prepareStatement(sqldele);
	stdel.executeQuery();
	stdel.close();
	
	//Insert temp records into GoogleCalendar
	// var sqlstmt = "INSERT INTO \"INTEGRATION\".\"GoogleCalendar\" SELECT * FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\"" ;

	var sqlstmt = "INSERT INTO \"INTEGRATION\".\"GoogleCalendar\" (	\"calendar_id\",\"calendar_title\",	\"c_time\",	\"c_applicationName\",	\"c_customerId\",	\"c_email\",	\"c_ownerDomain\",	\"end_time\",	\"event_guest\",	\"event_id\",	\"event_name\",	\"event_response_status\",	\"event_type\",	\"grantee_email\",	\"notification_message_id\",	\"notification_method\",	\"notification_type\",	\"old_event_title\",	\"organizer_calendar_id\",	\"recipient_email\",	\"start_time\",	\"subscriber_calendar_id\",	\"target_calendar_id\",	\"time_proposal_change\",	\"user_agent\",	\"c_nextPageToken\" )SELECT 	\"calendar_id\",	\"calendar_title\",	\"c_time\",	\"c_applicationName\",	\"c_customerId\",	\"c_email\",	\"c_ownerDomain\",	\"end_time\",	\"event_guest\",	\"event_id\",	\"event_name\",	\"event_response_status\",	\"event_type\",	\"grantee_email\",	\"notification_message_id\",	\"notification_method\",	\"notification_type\",	\"old_event_title\",	\"organizer_calendar_id\",	\"recipient_email\",	\"start_time\",	\"subscriber_calendar_id\",	\"target_calendar_id\",	\"time_proposal_change\",	\"user_agent\",	\"c_nextPageToken\"FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\" " ;

	var st = conn.prepareStatement(sqlstmt);
	st.executeQuery();
	st.close();
	
	
	conn.commit();
	conn.close();
	
	$.response.contentType = "text/plain";
	$.response.setBody("OK");
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