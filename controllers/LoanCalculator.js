'use strict';

var url = require('url');

let Loan = require('./lwcMortgage');

module.exports.getLoanTypeOptions = function getLoanTypeOptions (req, res, next) {
  console.log('Start method');
  let loan = Loan.getLoanTypeOptions();

  console.log(JSON.stringify(loan, null, 4));
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(loan, null, 4));
}
// Test method curl
// curl -X GET "http://localhost:8080/api/fhami?loanTermMonth=360&fhaMI=250000" -H "accept: application/json"
// RESULT:
//{
 //   "FHAMI": 90000000
// }
module.exports.calculateFHAMI = function calculateFHAMI (req, res, next) {
  //Loan.calculateFHAMI(req.swagger.params, res, next);
  console.log("Term:" + req.loanTermMonth.value);
  console.log("Val:"+ req.fhaMI.value);
  let fha = Loan.calculateFHAMI(req.loanTermMonth.value, req.fhaMI.value);
  let obj = {FHAMI: fha}
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj, null, 4));
}
// Test method curl
// curl -X GET "http://localhost:8080/api/periodicinterest?rate=4.3&payments=12" -H "accept: application/json"
// {    "value": "0.00033333" }
module.exports.calculatePeriodicInterest = function  calculatePeriodicInterest(req, res, next) {
    // Get parameters rate, payments
    let rate = req.rate.value;
    let payments = req.payments.value;
    
    let calc = Loan.calculatePeriodicInterest(rate,payments);
    console.log('PeriodicInterest: '+calc.toFixed(8));
    let obj = {value: calc.toFixed(8)}
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj, null, 4));
}

// Test method curl
// curl -X GET "http://localhost:8080/api/discountfactor?numberOfPayments=360&periodicRate=4" -H "accept: application/json"
//
module.exports.calculateDiscountFactor = function calculateDiscountFactor(req, res, next) {
    // Get params numberOfPayments, periodicRate
    let numberOfPayments = req.numberOfPayments.value;
    let periodicRate = req.periodicRate.value;
    let calc = Loan.calculateDiscountFactor(numberOfPayments, periodicRate);
    console.log('DiscountFactor: '+calc.toFixed(8));
    let obj = {value: calc.toFixed(4)}
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj, null, 4));
}
// Test method curl
// curl -X GET "http://localhost:8080/api/pipayment?principal=250000&discount=0.25" -H "accept: application/json"
//
module.exports.calclatePIPayment = function calclatePIPayment(req, res, next){
    // et params principal, discount
    let principal = req.principal.value;
    let discount = req.discount.value;
    let calc = Loan.calclatePIPayment(principal, discount);
    let obj = {value: calc.toFixed(2)}
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(obj, null, 4));  
}
// Test this method with curl
// curl -X GET "http://localhost:8080/api/loanbasic?principal=200000.00&rate=4.3&term=30&propertyTax=1700&homeownersInsurance=2100" -H "accept: application/json"
//
module.exports.calulateBasicLoanAttributes = function calulateBasicLoanAttributes(req, res, next){
    // et params principal, discount
    //console.log("JSON: "+JSON.stringify(req));
    let principal = req.principal.value;
    let rate = req.rate.value;
    let term = req.term.value;
    let propertyTax = req.propertyTax.value;
    let homeownersInsurance = req.homeownersInsurance.value;
    let calc = Loan.calulateBasicLoanAttributes(principal, rate, term, propertyTax, homeownersInsurance);
    
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(calc, null, 4));  
}

module.exports.calculateAmortizationTable = function calculateAmortizationTable(req, res, next){
  
    let obj = {}
    let calc = Loan.calculateAmortizationTable(obj);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(calc, null, 4));  
}