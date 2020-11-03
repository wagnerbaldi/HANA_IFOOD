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
	sqlstmt = "UPSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::ZoomMeetingDetail2\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?) where uuid =? and id =?";
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.meetings.root.length);
    
    for ( var i in jobj.meetings.root)  {
        count = true;

		st.setString(1,jobj.meetings.root[i].uuid);
		st.setString(2,jobj.meetings.root[i].id );
		st.setString(3,jobj.meetings.root[i].host_id);
		st.setString(4,jobj.meetings.root[i].type);
		st.setString(5,jobj.meetings.root[i].topic);
		st.setString(6,jobj.meetings.root[i].user_name);
		st.setString(7,jobj.meetings.root[i].user_email);
		st.setString(8,jobj.meetings.root[i].start_time);
		st.setString(9,jobj.meetings.root[i].end_time);
		st.setString(10,jobj.meetings.root[i].duration);
		st.setString(11,jobj.meetings.root[i].total_minutes);
		st.setString(12,jobj.meetings.root[i].participants_count);
		
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