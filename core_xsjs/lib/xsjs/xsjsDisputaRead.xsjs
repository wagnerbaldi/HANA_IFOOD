/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;

try {
	var cpf = $.request.headers.get('cpf');
	var conn = $.hdb.getConnection();
	var query = `SELECT TOP 10 * FROM "INTEGRATION"."SQLSever_BotLogs_disputa_cbk" where "CPF_DA_COMPRA" = '` + cpf + `' `;
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