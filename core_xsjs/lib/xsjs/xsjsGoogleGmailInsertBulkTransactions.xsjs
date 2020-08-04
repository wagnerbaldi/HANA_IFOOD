var count = false;
var sqlstmt = "";

try {
	var jobj = JSON.parse($.request.body.asString());
	
	var conn = $.db.getConnection();
	sqlstmt = "UPSERT \"IFOOD\".\"HANA_IFOOD.db.data::GoogleGmail\" VALUES( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) where \"Email\" = '?' and \"MessageID\" = '?' " ;
	var st = conn.prepareStatement(sqlstmt);

    st.setBatchSize(jobj.root.event.length);
    
    for ( var i in jobj.root.event)  {
        count = true;

		st.setString(1,jobj.root.event[i].Email);
		st.setString(2,jobj.root.event[i].MessageID);
		st.setString(3,jobj.root.event[i].Startdate);
		st.setString(4,jobj.root.event[i].Enddate);
		st.setString(5,jobj.root.event[i].Sender);
		st.setString(6,jobj.root.event[i].Messagesize);
		st.setString(7,jobj.root.event[i].Subject);
		st.setString(8,jobj.root.event[i].Direction);
		st.setString(9,jobj.root.event[i].Attachments);
		st.setString(10,jobj.root.event[i].Recipient_address);
		st.setString(11,jobj.root.event[i].Event_target);
		st.setString(12,jobj.root.event[i].Event_date);
		st.setString(13,jobj.root.event[i].Event_status);
		st.setString(14,jobj.root.event[i].Event_target_IP_address);
		st.setString(15,jobj.root.event[i].Has_encryption);
		st.setString(16,jobj.root.event[i].Event_SMTP_reply_code);
		st.setString(17,jobj.root.event[i].Event_description);
		
		st.setString(18,jobj.root.event[i].Email);
		st.setString(19,jobj.root.event[i].MessageID);
		
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