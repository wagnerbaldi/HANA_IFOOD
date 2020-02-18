
//var body = '$.response.Body';

    var i;

    var jBody = JSON.parse('{"Batch":{"BatchNo":"939","CompanyCode":"1122"},"AccountDocsPost":{"DocumentReference":"5000000000","TriggerConciliation":false,"DocumentType":"BL","Currency":"BRL","DocumentDate":"2019-09-01","PaymentBlock":"","PostingDate":"2019-09-02","HeaderText":"Teste ISJ","Items":[{"Rubric":"","Plant":"","DueDate":"","BusinessPartnerId":"50000093","Account":"","CostCenter":"","ProfitCenter":"","ItemText":"teste item 1","ItemType":"S","Amount":"100.00"},{"Rubric":"COMMISSION","Plant":"","DueDate":"","BusinessPartnerId":"","Account":"","CostCenter":"","ProfitCenter":"","ItemText":"Partida GL","ItemType":"H","Amount":"300.00"}]}}');

for (i in jBody.AccountDocsPost.Items) {
	
	if(jBody.AccountDocsPost.Items[i].ItemType === 'H'){
		
		jBody.AccountDocsPost.Items[i].Amount *= -1 ;

	}
	
}
    var body = JSON.stringify(jBody);

$.response.setBody(body);
$.response.contentType = "text/plain";
$.response.status = $.net.http.OK;
