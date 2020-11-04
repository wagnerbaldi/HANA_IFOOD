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
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeetingTemp\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;
		
		st.setString(1, checkUndefined(jobj.root.event[i].conference_id));
		st.setString(2, checkUndefined(jobj.root.event[i].c_time ));
		st.setString(3, checkUndefined(jobj.root.event[i].calendar_event_id));
		st.setString(4, checkUndefined(jobj.root.event[i].c_email));
		st.setString(5, checkUndefined(jobj.root.event[i].organizer_email));
		st.setString(6, checkUndefined(jobj.root.event[i].display_name));
		st.setString(7, checkUndefined(jobj.root.event[i].duration_seconds));
		st.setString(8, checkUndefined(jobj.root.event[i].audio_recv_seconds));
		st.setString(9, checkUndefined(jobj.root.event[i].audio_send_seconds));
		st.setString(10,checkUndefined(jobj.root.event[i].video_recv_seconds));
		st.setString(11,checkUndefined(jobj.root.event[i].video_send_seconds));
		st.setString(12,checkUndefined(jobj.root.event[i].c_applicationName));
		st.setString(13,checkUndefined(jobj.root.event[i].c_callerType));
		st.setString(14,checkUndefined(jobj.root.event[i].c_customerId));
		st.setString(15,checkUndefined(jobj.root.event[i].c_customerId2));
		st.setString(16,checkUndefined(jobj.root.event[i].device_type));
		st.setString(17,checkUndefined(jobj.root.event[i].end_of_call_rating));
		st.setString(18,checkUndefined(jobj.root.event[i].identifier ));
		st.setString(19,checkUndefined(jobj.root.event[i].identifier_type));
		st.setString(20,checkUndefined(jobj.root.event[i].location_country));
		st.setString(21,checkUndefined(jobj.root.event[i].location_region));
		st.setString(22,checkUndefined(jobj.root.event[i].c_nextPageToken));
		st.setInteger(23,0);
		
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