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
	sqlstmt = 'INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeet\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;' ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.event.length);
    
    for ( var i in jobj.event)  {
        count = true;

		st.setString(1,jobj.event[i].conference_id);
		st.setString(2,jobj.event[i].c_time );
		st.setString(3,jobj.event[i].calendar_event_id);
		st.setString(4,jobj.event[i].c_email);
		st.setString(5,jobj.event[i].organizer_email);
		st.setString(6,jobj.event[i].display_name);
		st.setString(7,jobj.event[i].duration_seconds);
		st.setString(8,jobj.event[i].audio_recv_seconds);
		st.setString(9,jobj.event[i].audio_send_seconds);
		st.setString(10,jobj.event[i].video_recv_seconds);
		st.setString(11,jobj.event[i].video_send_seconds);
		st.setString(12,jobj.event[i].c_applicationName);
		st.setString(13,jobj.event[i].c_callerType);
		st.setString(14,jobj.event[i].c_customerId);
		st.setString(15,jobj.event[i].c_customerId2);
		st.setString(16,jobj.event[i].device_type);
		st.setString(17,jobj.event[i].end_of_call_rating);
		st.setString(18,jobj.event[i].identifier );
		st.setString(19,jobj.event[i].identifier_type);
		st.setString(20,jobj.event[i].location_country);
		st.setString(21,jobj.event[i].location_region);

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
	$.response.setBody("Erro");
}