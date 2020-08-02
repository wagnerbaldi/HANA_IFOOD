var count = false;
var sqlstmt = "";

try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	sqlstmt = "INSERT INTO \"IFOOD\".\"HANA_IFOOD.db.data::GoogleGmailMessageID\" VALUES( ? )" ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;

		st.setString(1,jobj.root.event[i].Email);

		st.addBatch();
    }
    if (count === true) {
			st.executeBatch();
	}

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