
try {
	var conn = $.db.getConnection();
	var sqlstmt = "DELETE FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleMeetingTemp\"" ;
	var st = conn.prepareStatement(sqlstmt);
	st.executeQuery();
	st.close();
	conn.commit();
	conn.close();
	
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