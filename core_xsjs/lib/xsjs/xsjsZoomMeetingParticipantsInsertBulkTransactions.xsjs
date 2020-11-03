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
	sqlstmt = "UPSERT \"INTEGRATION\".\"ZoomMeetingParticipants\" VALUES( ?,?,?,?) WHERE \"Meeting\" =? AND \"UserId\" =? AND \"UserName\" =? AND \"UserEmail\" =?";
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.participants.length);
    
   // for ( var i in jobj.root)  {

		var meeting = jobj.root.meeting;
		
		for ( var k in jobj.root.participants) {
			        count = true;
		st.setString(1,meeting);
		st.setString(2,jobj.root.participants[k].id );
		st.setString(3,jobj.root.participants[k].name);
		st.setString(4,jobj.root.participants[k].user_email);
		st.setString(5,meeting);
		st.setString(6,jobj.root.participants[k].id );
		st.setString(7,jobj.root.participants[k].name);
		st.setString(8,jobj.root.participants[k].user_email);
		
		st.addBatch();
		
		}
		
		   if (count === true) {
			st.executeBatch();
	}
    //}
 
	st.close();

    //conn_del.commit();
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