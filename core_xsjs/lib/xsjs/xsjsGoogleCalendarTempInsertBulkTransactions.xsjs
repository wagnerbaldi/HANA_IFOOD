var count = false;
var sqlstmt = "";

function checkUndefined( p1 ) {
  if ( p1 === undefined ) {
  	return " " ;
  }
  return p1 ;
}

try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;
		
		st.setString(1,checkUndefined(jobj.root.event[i].calendar_id));
		st.setString(2,checkUndefined(jobj.root.event[i].calendar_title));
		st.setString(3,checkUndefined(jobj.root.event[i].c_time));
		st.setString(4,checkUndefined(jobj.root.event[i].c_applicationName));
		st.setString(5,checkUndefined(jobj.root.event[i].c_customerId));
		st.setString(6,checkUndefined(jobj.root.event[i].c_email));
		st.setString(7,checkUndefined(jobj.root.event[i].c_ownerDomain));
		st.setString(8,checkUndefined(jobj.root.event[i].end_time));
		st.setString(9,checkUndefined(jobj.root.event[i].event_guest));
		st.setString(10,checkUndefined(jobj.root.event[i].event_id));
		st.setString(11,checkUndefined(jobj.root.event[i].event_name));
		st.setString(12,checkUndefined(jobj.root.event[i].event_response_status));
		st.setString(13,checkUndefined(jobj.root.event[i].event_type));
		st.setString(14,checkUndefined(jobj.root.event[i].grantee_email));
		st.setString(15,checkUndefined(jobj.root.event[i].notification_message_id));
		st.setString(16,checkUndefined(jobj.root.event[i].notification_method));
		st.setString(17,checkUndefined(jobj.root.event[i].notification_type));
		st.setString(18,checkUndefined(jobj.root.event[i].old_event_title));
		st.setString(19,checkUndefined(jobj.root.event[i].organizer_calendar_id));
		st.setString(20,checkUndefined(jobj.root.event[i].recipient_email));
		st.setString(21,checkUndefined(jobj.root.event[i].start_time));
		st.setString(22,checkUndefined(jobj.root.event[i].subscriber_calendar_id));
		st.setString(23,checkUndefined(jobj.root.event[i].target_calendar_id));
		st.setString(24,checkUndefined(jobj.root.event[i].time_proposal_change));
		st.setString(25,checkUndefined(jobj.root.event[i].user_agent));
		st.setString(26,checkUndefined(jobj.root.event[i].c_nextPageToken));
		
		st.addBatch();
    }
    if (count === true) {
		st.executeBatch();
	}

	st.close();

	conn.commit();

	if (conn) {
		conn.close();
	}
	
	
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