/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var offset = $.request.headers.get('offset');
	var limit = $.request.headers.get('limit');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::GoogleGmailMessageID\" order by \"Email\", \"MessageID\"  limit " + limit  +" offset " + offset;
	var rs = conn.executeQuery(query);
	
	$.response.contentType = "application/json";
	$.response.setBody(rs); 
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