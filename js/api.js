/**
 * Created by Hristo on 03/08/2017.
 */

function getAddress() {
    let a = location.search&&location.search.substr(1).replace(/\+/gi," ").split("&");
    for (let i in a) {
        let s = a[i].split("=");
        a[i]  = a[unescape(s[0])] = unescape(s[1]);
    }
    let address = a[0];
    return address;
}
let address = getAddress();

let validAddress = address.length === 42 && address.substring(0,2) === "0x";
if (!validAddress) {
    $("#error").html('Invalid ETH address!');
    $("#result").html.clear();
}
let info = [];

function getTransactions(n) {
    let inputAddress = n;
    let api = "http://api.etherscan.io/api?module=account&action=txlist&address=" + inputAddress + "&startblock=0&endblock=99999999&sort=asc&apikey=TBDQTMNF5N3IWMAEQYJE4ZEI83RYQKTQCQ";
    $.getJSON(api, function(data){
        let value = data.result;

        for(let i = 0; i < value.length; i++) {
            let addressFrom = value[i].from;
            let addressTo = value[i].to;
            let transActionValue = value[i].value  / 1000000000000000000;
            let time = parseInt(value[i].timeStamp*1000);
            var d = new Date(time);
            let result = addressFrom + ',' + addressTo + ',' + transActionValue + ',' + d;
            let info2 = result.split(',')
            info.push(info2);
            //info2.push(addressFrom);
            //info2.push(addressTo);//
            //info2.push(transActionValue);//

        }
    });

}
getTransactions(address);

//csv
function downloadCsv() {
    let csv = 'Address from,Address to,Value, Date / time\n';
    info.forEach(function(row) {
        csv += row.join(',');
        csv += "\n";
    });

    console.log(csv);
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'transactions.csv';
    hiddenElement.click();
}
//csv
