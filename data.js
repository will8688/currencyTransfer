class Data {
    constructor(){
    }
    get currency(){
        return new Promise((resolve, reject) => {
            const xmlhttp = new XMLHttpRequest();
            const scope = this;
            xmlhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    const data = JSON.parse(this.responseText);
                    resolve(data);
                }else if (this.status === 404){
                    reject(this.status);
                }
            };
            const url = `http://stage.currencytransfer.com/api/v1/currencies/pairs`;
            xmlhttp.open('GET', url);
            xmlhttp.setRequestHeader('email', 'stevan@litobac.com');
            xmlhttp.setRequestHeader('api_key', 'zg758gA4XplGhXWDagQL7tfeNM9qsNyq');
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.send();

        });
    }
}
module.exports = Data;