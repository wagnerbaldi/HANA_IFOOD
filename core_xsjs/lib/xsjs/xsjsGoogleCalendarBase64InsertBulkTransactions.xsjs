
try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	var sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarBase64\" VALUES( ?,?)" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(1);
    st.setString(1,jobj.c_id);
	st.setString(2,jobj.c_base64);
	st.addBatch();
	st.executeBatch();
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