var body = $.request.body.asString();
body = JSON.parse(body);
for (var i = 0; i < body.AccountDocsPost.length; i++) {
	
    for (var k = 0; k < body.AccountDocsPost[i].Items.length; k++) {
        if (body.AccountDocsPost[i].Items[k].ItemType === "H") {

            body.AccountDocsPost[i].Items[k].Amount *= -1;
        }
    }
}

$.response.setBody(body);
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;