var count = false;
var sqlstmt = "";

try {

	var jobj = JSON.parse($.request.body.asString());
	var conn = $.db.getConnection();

	sqlstmt = "INSERT INTO \"INTEGRATION\".\"ARIBA_REQUISITION\" (ApprovedState,SourcingStatus,InitialUniqueName,Name) VALUES( ?,?,?,?) ";
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.Records.length);
    
	for ( var k in jobj.root.Records) {
		count = true;
		st.setString(1,jobj.root.Records[k].ApprovedState);
		st.setString(2,jobj.root.Records[k].SourcingStatus );
		st.setString(3,jobj.root.Records[k].InitialUniqueName);
		st.setString(4,jobj.root.Records[k].Name);
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
    
	$.response.contentType = "text/plain";
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody(e.message);
}