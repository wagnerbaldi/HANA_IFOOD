/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var lastEmail = $.request.headers.get('lastEmail');
	var conn = $.hdb.getConnection();
	var query = "select * from \"IFOOD\".\"HANA_IFOOD.db.data::GoogleUser\" where \"Email\" >= '"+ lastEmail +"' order by \"Email\" ";
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