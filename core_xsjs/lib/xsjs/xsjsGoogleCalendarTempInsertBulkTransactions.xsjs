var count = false;
var sqlstmt = "";

try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;

		st.setString(1,jobj.root.event[i].calendar_id);
		st.setString(2,jobj.root.event[i].calendar_title);
		st.setString(3,jobj.root.event[i].c_time);
		st.setString(4,jobj.root.event[i].c_applicationName);
		st.setString(5,jobj.root.event[i].c_customerId);
		st.setString(6,jobj.root.event[i].c_email);
		st.setString(7,jobj.root.event[i].c_ownerDomain);
		st.setString(8,jobj.root.event[i].end_time);
		st.setString(9,jobj.root.event[i].event_guest);
		st.setString(10,jobj.root.event[i].event_id);
		st.setString(11,jobj.root.event[i].event_name);
		st.setString(12,jobj.root.event[i].event_response_status);
		st.setString(13,jobj.root.event[i].event_type);
		st.setString(14,jobj.root.event[i].grantee_email);
		st.setString(15,jobj.root.event[i].notification_message_id);
		st.setString(16,jobj.root.event[i].notification_method);
		st.setString(17,jobj.root.event[i].notification_type);
		st.setString(18,jobj.root.event[i].old_event_title);
		st.setString(19,jobj.root.event[i].organizer_calendar_id);
		st.setString(20,jobj.root.event[i].recipient_email);
		st.setString(21,jobj.root.event[i].start_time);
		st.setString(22,jobj.root.event[i].subscriber_calendar_id);
		st.setString(23,jobj.root.event[i].target_calendar_id);
		st.setString(24,jobj.root.event[i].time_proposal_change);
		st.setString(25,jobj.root.event[i].user_agent);
		st.setString(26,jobj.root.event[i].c_nextPageToken);
		
		st.addBatch();
    }
    if (count === true) {
			st.executeBatch();
	}

	st.close();

    //conn_del.commit();
	conn.commit();

	if (conn) {
		conn.close();
	}
	
	/*
	if (conn_del) {
		conn_del.close();
	}
	*/
	
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