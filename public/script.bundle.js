/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const App = __webpack_require__(2);
new App();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Data = __webpack_require__(3);
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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);