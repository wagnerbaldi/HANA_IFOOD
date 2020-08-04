var count = false;
var sqlstmt = "";

try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	sqlstmt = "UPSERT \"IFOOD\".\"HANA_IFOOD.db.data::GoogleUser\" VALUES( ? ) where \"Email\" = ? " ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.primaryEmail.length);
    
    for ( var i in jobj.root.primaryEmail)  {
        count = true;

		st.setString(1,jobj.root.primaryEmail[i]);
		st.setString(2,jobj.root.primaryEmail[i]);

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