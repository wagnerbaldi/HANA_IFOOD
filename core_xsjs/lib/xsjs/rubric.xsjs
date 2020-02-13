/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
/*eslint-env node, es6 */
"use strict";
var output = [] ;


var conn = $.hdb.getConnection();
var query = "select RUBRIC, SHKZG_1 from \"IFOOD\".\"HANA_IFOOD.db.data::ZTCA_RUBRIC_PAR\" ";
var rs = conn.executeQuery(query);

var body = "";
for(var lines of rs){
	var tobj = {} ;
	tobj.rubric = lines.RUBRIC ;
	tobj.shkzg  = lines.SHKZG_1;
	output.push(tobj);
}

$.response.contentType = "application/json";
$.response.setBody(JSON.stringify(output)); 
$.response.status = $.net.http.OK;