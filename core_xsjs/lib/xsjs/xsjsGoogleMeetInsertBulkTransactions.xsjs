var count = false;
var sqlstmt = "";

try {
	var jobj = JSON.parse($.request.body.asString());
	
	/*
	var conn_del = $.db.getConnection();
	conn_del.prepareStatement("SET SCHEMA SALESFORCE_ONCO").execute();
	sqlstmt = `DELETE FROM "` + tableID +  `"`;
	var st_del = conn_del.prepareStatement(sqlstmt);
	st_del.execute();
	*/
	
	var conn = $.db.getConnection();
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeet\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;

		st.setString(1,jobj.root.event[i].conference_id);
		st.setString(2,jobj.root.event[i].c_time );
		st.setString(3,jobj.root.event[i].calendar_event_id);
		st.setString(4,jobj.root.event[i].c_email);
		st.setString(5,jobj.root.event[i].organizer_email);
		st.setString(6,jobj.root.event[i].display_name);
		st.setString(7,jobj.root.event[i].duration_seconds);
		st.setString(8,jobj.root.event[i].audio_recv_seconds);
		st.setString(9,jobj.root.event[i].audio_send_seconds);
		st.setString(10,jobj.root.event[i].video_recv_seconds);
		st.setString(11,jobj.root.event[i].video_send_seconds);
		st.setString(12,jobj.root.event[i].c_applicationName);
		st.setString(13,jobj.root.event[i].c_callerType);
		st.setString(14,jobj.root.event[i].c_customerId);
		st.setString(15,jobj.root.event[i].c_customerId2);
		st.setString(16,jobj.root.event[i].device_type);
		st.setString(17,jobj.root.event[i].end_of_call_rating);
		st.setString(18,jobj.root.event[i].identifier );
		st.setString(19,jobj.root.event[i].identifier_type);
		st.setString(20,jobj.root.event[i].location_country);
		st.setString(21,jobj.root.event[i].location_region);
		st.setString(22,jobj.root.event[i].c_nextPageToken);
		
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