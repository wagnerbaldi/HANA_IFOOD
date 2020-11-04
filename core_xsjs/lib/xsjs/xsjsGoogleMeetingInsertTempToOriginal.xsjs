
var header_ctime = $.request.headers.get('c_time');

try {
	var conn = $.db.getConnection();
	
	//Delete duplicate timestamp records
	var sqldele = "DELETE FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeetingTemp\" where \"c_time\" <= '" + header_ctime + "'" ;
	var stdel = conn.prepareStatement(sqldele);
	stdel.executeQuery();
	stdel.close();
	
	//Insert temp records into GoogleCalendar
	//var sqlstmt = "INSERT INTO \"INTEGRATION\".\"GoogleMeeting\" SELECT * FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeetingTemp\"" ;
	
	var sqlstmt = "INSERT INTO \"INTEGRATION\".\"GoogleMeeting\" ( \"conference_id\",\"c_time\",\"calendar_event_id\",\"c_email\",\"organizer_email\",\"display_name\",\"duration_seconds\",\"audio_recv_seconds\",\"audio_send_seconds\",\"video_recv_seconds\",\"video_send_seconds\",\"c_applicationName\",\"c_callerType\",\"c_customerId\",\"c_customerId2\",\"device_type\",\"end_of_call_rating\",\"identifier\",\"identifier_type\",\"location_country\",\"location_region\",\"c_nextPageToken\") SELECT \"conference_id\",\"c_time\",\"calendar_event_id\",\"c_email\",\"organizer_email\",\"display_name\",\"duration_seconds\",\"audio_recv_seconds\",\"audio_send_seconds\",\"video_recv_seconds\",\"video_send_seconds\",\"c_applicationName\",\"c_callerType\",\"c_customerId\",\"c_customerId2\",\"device_type\",\"end_of_call_rating\",\"identifier\",\"identifier_type\",\"location_country\",\"location_region\",\"c_nextPageToken\" FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeetingTemp\"" ;
	
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