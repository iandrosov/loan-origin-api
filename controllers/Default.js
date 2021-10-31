'use strict';

var url = require('url');


var LoanCalculator = require('./LoanCalculator');

module.exports.getLoanTypeOptions = function getLoanTypeOptions (req, res, next) {
  LoanCalculator.getLoanTypeOptions(req.swagger.params, res, next);
};

module.exports.calculateFHAMI = function calculateFHAMI (req, res, next) {
  LoanCalculator.calculateFHAMI(req.swagger.params, res, next);
};

module.exports.calculatePeriodicInterest = function  calculatePeriodicInterest(req, res, next) {
  LoanCalculator.calculatePeriodicInterest(req.swagger.params, res, next);
};

module.exports.calculateDiscountFactor = function calculateDiscountFactor(req, res, next) {
  LoanCalculator.calculateDiscountFactor(req.swagger.params, res, next);
};

module.exports.calclatePIPayment = function calclatePIPayment(req, res, next){
  LoanCalculator.calclatePIPayment(req.swagger.params, res, next);
};

module.exports.calulateBasicLoanAttributes = function calulateBasicLoanAttributes(req, res, next){
  LoanCalculator.calulateBasicLoanAttributes(req.swagger.params, res, next);
};
