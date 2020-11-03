var count = false;
var sqlstmt = "";
var append = "";


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
    sqlstmt = "UPSERT \"IFOOD\".\"HANA_IFOOD.db.data::ZoomUsersDetail\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) WHERE \"Id\" =?"; 
    var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.users.length);

    count = true;
    for ( var x  in jobj.users){
        st.setString(1, jobj.users[x].id);
        st.setString(2, jobj.users[x].first_name);
        st.setString(3, jobj.users[x].last_name);
        st.setString(4, jobj.users[x].email);
        st.setString(5, jobj.users[x].type);
        st.setString(6, jobj.users[x].pmi);
        st.setString(7, jobj.users[x].timezone);
        st.setString(8, jobj.users[x].verified);
        st.setString(9, jobj.users[x].dept);
        st.setString(10, jobj.users[x].created_at);
        st.setString(11, jobj.users[x].last_login_time);
        st.setString(12, jobj.users[x].last_client_version);
        st.setString(13, jobj.users[x].group_ids);
        st.setString(14, jobj.users[x].language);
        st.setString(15, jobj.users[x].phone_number);
        st.setString(16, jobj.users[x].status);
        st.setString(17, jobj.users[x].pic_url);
        st.setString(18, jobj.users[x].id);
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