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
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::ZoomUsersDetail\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.usermeeting.users.length);
    
    for ( var i in jobj.usermeeting.users)  {
        count = true;

		st.setString(1,jobj.usermeeting.users[i].id);
		st.setString(2,jobj.usermeeting.users[i].first_name );
		st.setString(3,jobj.usermeeting.users[i].last_name);
		st.setString(4,jobj.usermeeting.users[i].email);
		st.setString(5,jobj.usermeeting.users[i].type);
		st.setString(6,jobj.usermeeting.users[i].pmi);
		st.setString(7,jobj.usermeeting.users[i].timezone);
		st.setString(8,jobj.usermeeting.users[i].verified);
		st.setString(9,jobj.usermeeting.users[i].dept);
		st.setString(10,jobj.usermeeting.users[i].created_at);
		st.setString(11,jobj.usermeeting.users[i].last_login_time);
		st.setString(12,jobj.usermeeting.users[i].last_client_version);
		st.setString(13,jobj.usermeeting.users[i].group_ids);
		st.setString(14,jobj.usermeeting.users[i].language);
		st.setString(15,jobj.usermeeting.users[i].phone_number);
		st.setString(16,jobj.usermeeting.users[i].status);
		st.setString(17,jobj.usermeeting.users[i].pic_url);
		
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