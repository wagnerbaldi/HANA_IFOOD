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
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::ZoomMeetingDetailTemp\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?)";
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.Meetings.Meeting.length);
    
    for ( var i in jobj.Meetings.Meeting)  {
        count = true;

		st.setString(1,jobj.Meetings.Meeting[i].uuid);
		st.setString(2,jobj.Meetings.Meeting[i].id );
		st.setString(3,jobj.Meetings.Meeting[i].host_id);
		st.setString(4,jobj.Meetings.Meeting[i].type);
		st.setString(5,jobj.Meetings.Meeting[i].topic);
		st.setString(6,jobj.Meetings.Meeting[i].user_name);
		st.setString(7,jobj.Meetings.Meeting[i].user_email);
		st.setString(8,jobj.Meetings.Meeting[i].start_time);
		st.setString(9,jobj.Meetings.Meeting[i].end_time);
		st.setString(10,jobj.Meetings.Meeting[i].duration);
		st.setString(11,jobj.Meetings.Meeting[i].total_minutes);
		st.setString(12,jobj.Meetings.Meeting[i].participants_count);
		st.setString(13,jobj.Meetings.Meeting[i].dept);
		
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