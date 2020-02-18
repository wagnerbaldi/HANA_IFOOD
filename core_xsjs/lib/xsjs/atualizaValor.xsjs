var body = $.request.body.asString();
var i = 0;
var k = 0;

for( i in body.AccountDocsPost ){
	for ( k in body.AccountDocsPost.Items ) {
	//	if( body.AccountDocsPost[i].Items[k].ItemType === "H" ){
			
			body.AccountDocsPost[i].Items[k].Amount *= -1 ;
	//	}
	}
}

$.response.setBody(body);
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;
