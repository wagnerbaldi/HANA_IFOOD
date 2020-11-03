try {
	var conn = $.db.getConnection();
	var sqlstmt = "DELETE FROM \"IFOOD\".\"HANA_IFOOD.db.data::ZoomMeetingDetailTemp\"" ;
	var st = conn.prepareStatement(sqlstmt);
	st.executeQuery();
	st.close();
	conn.commit();
	conn.close();
	
	$.response.contentType = "text/xml";
	$.response.setBody("<Status>OK</Status>");
	$.response.status = $.net.http.OK;
	
} catch (e) {
	var tobjerr = {};

	tobjerr.status = $.net.http.INTERNAL_SERVER_ERROR;
	tobjerr.message = e.message;
	tobjerr.description = e.message;

	$.response.contentType = "text/xml";
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody( "<erro>" + e.message + "</erro>");
}
