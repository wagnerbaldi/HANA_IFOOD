var body = $.request.body.asString();
body = JSON.parse(body);
var mensagem = {};
mensagem.DocumentReference = new Array();
mensagem.DocumentReference.itemMessage = new Array();
var itemMessage = [];
var isItemPartnerValido = null;
var isItemKeyValido = null;

var conn = $.hdb.getConnection();
var query = "select RUBRIC  from \"IFOOD\".\"HANA_IFOOD.db.data::ZTCA_RUBRIC_PAR\" ";
var rs = conn.executeQuery(query);

for (var i = 0; i < body.AccountDocsPost.length; i++) {
    mensagem.DocumentReference.push({
        "DocumentReference": body.AccountDocsPost[i].DocumentReference
    });
    var count = 0;

    for (var k = 0; k < body.AccountDocsPost[i].Items.length; k++) {

        //Valida soma dos itens
        count += parseInt(body.AccountDocsPost[i].Items[k].Amount);

        //Valida se rubrica está cadastrada
        var pos = rs.map(function (e) {
            return e.RUBRIC;
        }).indexOf(body.AccountDocsPost[i].Items[k].Rubric);

        if (pos === -1 && body.AccountDocsPost[i].Items[k].Rubric !== "") {
            itemMessage.push({
                "Mensagem": "Rubrica " + body.AccountDocsPost[i].Items[k].Rubric + " não cadastrada."
            });
        }

        //Valida parceiros
        if (isItemPartnerValido === null && body.AccountDocsPost[i].Items[k].BusinessPartnerId !== "") {
            isItemPartnerValido = "X";
        }

        //Valida indicador débito e crédito        
        if (isItemKeyValido === null && body.AccountDocsPost[i].Items[k].ItemType !== "") {
            isItemKeyValido = "X";
        } else if (body.AccountDocsPost[i].Items[k].ItemType === "") {
            isItemKeyValido = null;
        }

        //Valida BP e conta         
        if (body.AccountDocsPost[i].Items[k].BusinessPartnerId !== "" && body.AccountDocsPost[i].Items[k].Account !== "") {
            itemMessage.push({
                "Mensagem": "Conta de BP não devem estar preenchidos"
            });
        }

        //Valida obrigatoriedade do campo Plant        
        if (body.AccountDocsPost[i].Items[k].BusinessPartnerId === "" && body.AccountDocsPost[i].Items[k].Account !== "" && body.AccountDocsPost[i].Items[k].Plant === "") {
            isItemPartnerValido = "X";
            itemMessage.push({
                "Mensagem": "Plant é obrigatório"
            });
        }

        //Valida conta e parceiro
        if (body.AccountDocsPost[i].Items[k].BusinessPartnerId === "" && body.AccountDocsPost[i].Items[k].Account === "") {
            itemMessage.push({
                "Mensagem": "Conta e BP não devem estar em branco"
            });
        }

    }

    if (count !== 0) {
        itemMessage.push({
            "Mensagem": "Somatória dos itens diferente de zero"
        });
    }
    //Valida parceiros
    if (isItemPartnerValido === null) {
        itemMessage.push({
            "Mensagem": "Nenhum parceiro informado"
        });
    }

    //Valida indicador débito e crédito    
    if (isItemKeyValido === null) {
        itemMessage.push({
            "Mensagem": "Indicador de débito/crédito não informado"
        });
    }

    mensagem.DocumentReference[i].itemMessage = itemMessage;
    itemMessage = [];
    isItemPartnerValido = null;
    isItemKeyValido = null;
}

$.response.setBody(mensagem);
$.response.contentType = "application/json";
$.response.status = $.net.http.OK;