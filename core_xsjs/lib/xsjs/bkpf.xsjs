/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;


var conn = $.hdb.getConnection();
var query = "select BUKRS, BELNR from \"IFOOD\".\"HANA_IFOOD.db.models::CVD_BKPF\" ";
var rs = conn.executeQuery(query);

var body = "";
for(var lines of rs){
	var tobj = {} ;
	tobj.bukrs = lines.BUKRS ;
	tobj.belnr = lines.BELNR;
	output.push(tobj);
}

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(output)); 
$.response.status = $.net.http.OK;