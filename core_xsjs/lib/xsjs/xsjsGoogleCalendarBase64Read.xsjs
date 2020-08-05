/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;


var conn = $.hdb.getConnection();
var query = "select \"c_id\", \"c_base64\" from \"IFOOD\".\"HANA_IFOOD.db.data::GoogleCalendarBase64\" order by \"c_id\" desc limit 1 ";
var rs = conn.executeQuery(query);

var body = "";
for(var lines of rs){
	var tobj = {} ;
	tobj.c_id	  = lines.c_id ;
	tobj.c_bse64  = lines.c_base64;
	output.push(tobj);
}

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(output)); 
$.response.status = $.net.http.OK;