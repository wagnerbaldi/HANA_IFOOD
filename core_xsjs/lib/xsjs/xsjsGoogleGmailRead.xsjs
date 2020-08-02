/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::GoogleGmail\" order by \"Email\", \"MessageID\" limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	var body = "";
	
	if ( offset === "0" ) {
		body = body + "Email" + "|" ;
		body = body + "MessageID" + "|" ;
		body = body + "Startdate" + "|" ;
		body = body + "Enddate" + "|" ;
		body = body + "Sender" + "|" ;
		body = body + "Messagesize" + "|" ;
		body = body + "Subject" + "|" ;
		body = body + "Direction" + "|" ;
		body = body + "Attachments" + "|" ;
		body = body + "Recipient_address" + "|" ;
		body = body + "Event_target" + "|" ;
		body = body + "Event_date" + "|" ;
		body = body + "Event_status" + "|" ;
		body = body + "Event_target_IP_address" + "|" ;
		body = body + "Has_encryption" + "|" ;
		body = body + "Event_SMTP_reply_code" + "|" ;
		body = body + "Event_description" + "\n" ;
	}
		
	var numberReg = false;
	
	for(var lines of rs){
	
		numberReg = true ;
		
		body = body + lines.Email + "|" ;
		body = body + lines.MessageID + "|" ;
		body = body + lines.Startdate + "|" ;
		body = body + lines.Enddate + "|" ;
		body = body + lines.Sender + "|" ;
		body = body + lines.Messagesize + "|" ;
		body = body + lines.Subject + "|" ;
		body = body + lines.Direction + "|" ;
		body = body + lines.Attachments + "|" ;
		body = body + lines.Recipient_address + "|" ;
		body = body + lines.Event_target + "|" ;
		body = body + lines.Event_date + "|" ;
		body = body + lines.Event_status + "|" ;
		body = body + lines.Event_target_IP_address + "|" ;
		body = body + lines.Has_encryption + "|" ;
		body = body + lines.Event_SMTP_reply_code + "|" ;		
		body = body + lines.Event_description + "\n" ;
	}
	
	if ( numberReg === true ) {
		$.response.contentType = "text/csv";
		$.response.setBody(body); 
		$.response.status = $.net.http.OK;
	} else {
		$.response.contentType = "text/plain";
		$.response.setBody("End"); 
		$.response.status = $.net.http.OK;		
	}

} catch (e) {
	var tobjerr = {};

	tobjerr.status = $.net.http.INTERNAL_SERVER_ERROR;
	tobjerr.message = e.message;
	tobjerr.description = e.message;

	$.response.contentType = "text/plain";
	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
	$.response.setBody("End");
}