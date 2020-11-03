
var header_ctime = $.request.headers.get('c_time');

try {
	var conn = $.db.getConnection();
	
	//Delete duplicate timestamp records
	var sqldele = "DELETE FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\" where \"c_time\" <= '" + header_ctime + "'" ;
	var stdel = conn.prepareStatement(sqldele);
	stdel.executeQuery();
	stdel.close();
	
	//Insert temp records into GoogleCalendar
	var sqlstmt = "INSERT INTO \"INTEGRATION\".\"GoogleCalendar\" SELECT * FROM \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarTemp\"" ;
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