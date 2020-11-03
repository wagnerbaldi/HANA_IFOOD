/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::ZoomUsersDetail\" order by \"Id\" limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	var body = "";
	
	if ( offset === "0" ) {
		body = body + "Id"					+ "|" ;
		body = body + "FisrtName"			+ "|" ;
		body = body + "LastName"			+ "|" ;
		body = body + "Email"				+ "|" ;
		body = body + "Type"            	+ "|" ;
		body = body + "Pmi"		        	+ "|" ;
		body = body + "TimeZone"      		+ "|" ;
		body = body + "Verified"        	+ "|" ;
		body = body + "Dept"	        	+ "|" ;
		body = body + "CreatedAt"	    	+ "|" ;
		body = body + "LastLoginTime"		+ "|" ;
		body = body + "LastClientVersion"	+ "|" ;
		body = body + "GroupIds"	    	+ "|" ;
		body = body + "Language"	    	+ "|" ;
		body = body + "PhoneNumber"			+ "|" ;
		body = body + "Status"				+ "|" ;
		body = body + "PicUrl"				+ "\n";
	
	}
		
	var numberReg = false;
	
	for(var lines of rs){
	
		numberReg = true ;
		
		body = body + lines.Id		           + "|";
		body = body + lines.FisrtName		   + "|";
		body = body + lines.LastName		   + "|";
		body = body + lines.Email			   + "|";
		body = body + lines.Type               + "|";
		body = body + lines.Pmi		           + "|";
		body = body + lines.TimeZone      	   + "|";
		body = body + lines.Verified           + "|";
		body = body + lines.Dept	           + "|";
		body = body + lines.CreatedAt	       + "|";
		body = body + lines.LastLoginTime	   + "|";
		body = body + lines.LastClientVersion  + "|";
		body = body + lines.GroupIds	       + "|";
		body = body + lines.Language	       + "|";
		body = body + lines.PhoneNumber		   + "|";
		body = body + lines.Status			   + "|";
		body = body + lines.PicUrl			   + "\n";
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