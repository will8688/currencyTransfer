const Data = require('./data.js');
class App {
    constructor(data){
        this.data = new Data();
        const loadCurrency = this.data.currency;
        loadCurrency.then( (data) => {
            this.render(data);
        });
        this.attachEventListeners();     
    }
    getHtml(data){
        return `<option value="${data.currency_pairs}" >${data.currency_pairs}</option>`;  
    }
    render(data){
        const currencyOptions = this.getHtml(data);
        document.getElementById('js-currency1').innerHTML = currencyOptions;
	    document.getElementById('js-currency2').innerHTML = currencyOptions;
    }
    attachEventListeners(){

        const switchElements = document.querySelectorAll('.js-currency');
	    if(switchElements){
            switchElements.forEach((el) => {
	      		el.addEventListener('change', (e) => {
                    this.recalculate();
			    });
	      })
        }
        const amountElements = document.querySelectorAll('.js-amount');
	    if(amountElements){
            amountElements.forEach((el) => {
	      		el.addEventListener('change', (e) => {
                    this.recalculate();
			    });
	      })
	    }

    }
    validate(){
        const rate = document.getElementById('js-rate').value;
        const amount1 = document.getElementById('js-amount1').value;
        const amount2 = document.getElementById('js-amount2').value;
        if(amount1 && amount1 > 0){
            document.getElementById('js-currency2').value = '';
            this.data.amount = amount1;
            this.data.currency = document.getElementById('js-currency1').value;
            return true;
        }else if(amount2 && amount2 > 0){
            document.getElementById('js-currency1').value = '';
            this.data.amount = amount2;
            this.data.currency = document.getElementById('js-currency2').value;
            return true;
        }else{
            alert('Please enter a figure for Amount or Rate (0 > )');
            return false;
        }
    }
    recalculate(){
        const valid = this.validate();
        if(valid){
            const recalculate = this.data.recalculate;
            recalculate.then( (data) => {
                this.data.recalculate();
            });
        }
    }
}
module.exports = App;