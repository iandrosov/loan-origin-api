var util = require('util');

const config = require('config');

const getTermOptions = () => {
    return [
        { label: '15 years', value: 15 },
        { label: '20 years', value: 20 },
        { label: '25 years', value: 25 },
        { label: '30 years', value: 30 },
        { label: '35 years', value: 35 },
        { label: '40 years', value: 40 }
    ];
};
/*
const recordMetadata = {
    name: 'name',
    amount: 'currency',
};
*/
const getLoanTypeOptions = () => {
    return [
        {label: 'FHA', value: 'FHA'},
        {label: 'VA', value: 'VA'},
        {label: 'Conventional', value: 'Conv'}
    ];
};

const calculateFHAMI = (loanTermMonth, fhaMI) => {
    const fhamiLoanTerm = loanTermMonth * fhaMI;
    return fhamiLoanTerm;
};

/* -- KEEP this here as example of CommonJS syntax for Node
exports.calculateFHAMI = function(loanTermMonth, fhaMI) {
    const fhamiLoanTerm = loanTermMonth * fhaMI;
    return fhamiLoanTerm;
};
*/
// Calculate basic Loan attributes a composite function combines calculation
// Defaults: payments per yer monthly - 12
// @param (number) principal - required Total loan amount, loa principal
// @param (number) rate - required Interest rate
// @param (number) term - required Loan term in years only full numbers
// @param (number) propertyTax - optional Property taxes
// @param (number) homeownersInsurance - optional Insurance home yearly primium 
const calulateBasicLoanAttributes = (principal, rate, term, propertyTax, homeownersInsurance) => {
    let paymentPerYear = 12; // Monthly
    let loanTermMonth = term * 12; // get month term from years
    let periodicInterest = calculatePeriodicInterest(rate, paymentPerYear);
    let discountFactor = calculateDiscountFactor(loanTermMonth, periodicInterest);
    let monthlyPayment = calclatePIPayment(principal, discountFactor);
    let totalEscrowMonthly = (propertyTax / paymentPerYear) + (homeownersInsurance / paymentPerYear);
    let totalMonthlyPayment = monthlyPayment + totalEscrowMonthly;
    
    return {principal: principal,
            rate: rate,
            loanTermMonth: loanTermMonth,  
            paymentPerYear: paymentPerYear,
            periodicInterest: periodicInterest,
            discountFactor: discountFactor,
            monthlyPayment: monthlyPayment,
            totalEscrowMonthly: totalEscrowMonthly,
            totalMonthlyPayment: totalMonthlyPayment
        }
}

// Basic month payment claculation formula
// @param {number} principal - loan pronicipal value.
// @param (number) years - period of loan yars
// @param (number) rate - interets rate
const calculateMonthlyPayment = (principal, years, rate) => {
    if (principal && years && rate && rate > 0) {
        const monthlyRate = rate / 100 / 12;
        const monthlyPayment =
            (principal * monthlyRate) /
            (1 - Math.pow(1 / (1 + monthlyRate), years * 12));
        return monthlyPayment;
    }
    return 0;
};

// Amount of interest paied on each monthly payment
// BEGIN BALANCE * (interestRate/Paymentperyear)
// @param (number) balance - loan balance remaining
// @param (number) rate - interets rate
// @param {number} payments - payment value 
const calculateMonthlyInterest = (balance, rate, payments) => {
    if (balance && rate && payments > 0) {
        const monthlyInterest = balance * (rate / payments);
        return monthlyInterest;
    }
    return 0;
};
// Retun todays date in a string format YYY-MM-DD
const getTodayDate = () => {
    var displayDate = new Date();
    var val = displayDate.getUTCFullYear() +"-"+(displayDate.getUTCMonth()+1)+"-"+displayDate.getUTCDate();
    return val;
};

// Add number of given month to a date as a string
const addMonthDate = (datestr, month ) => {
    var resultDate = new Date("2019-01-12");
    var newDate = new Date(datestr);
    var displayDate = new Date(datestr);
    var val;
    var displayMon;
    if (datestr && month) {
       newDate = new Date(datestr);
       if (month > 0){
           resultDate = newDate;
           resultDate = resultDate.setUTCMonth(newDate.getUTCMonth() + month);
           displayDate = new Date(resultDate);
       }else{
        displayDate = new Date(datestr);
       }
    }

    displayMon = displayDate.getUTCMonth()+1;
    val = displayMon+"/"+displayDate.getUTCDate()+"/"+displayDate.getUTCFullYear();

    return val;
};
// Monthly Ending balance calculation
// IF([@[SCHEDULED PAYMENT]]+[@[ADDITIONAL PRINCIPAL APPLIED]]<=[@[BEGINNING BALANCE]],[@[BEGINNING BALANCE]]-[@PRINCIPAL],0),"")
// @param {number} balance - loan balance value.
// @param {number} principal - loan pronicipal value.
const calculateMonthlyEndBalance = (balance, principal ) => {
    if (balance &&  principal > 0) {
        const monthlyEndBalance = balance - principal;
        return monthlyEndBalance;
    }
    return 0;
};

// Calculate monthly payment based on discount factor
// @param (number) principal - principal of loan over time
// @param (number) discount - calculated discount rate
const calclatePIPayment = (principal, discount) => {
    if(principal && discount > 0){
        const mpayment = principal / discount;
        return mpayment;
    }
    return 0;
};

// Standard Discount Factor formula implementation
// [(1 + i) ^n] - 1} / [i(1 + i)^n]
// @param (number) umberOfPayments - number of payment for duration of the loan can be over 30 years 360
// @param (number) periodicRate - periodic interste rate 
const calculateDiscountFactor = (numberOfPayments, periodicRate) => {
    if(numberOfPayments && periodicRate > 0){
        const discountFactor = 
            (Math.pow((1 + periodicRate), numberOfPayments) - 1) / (periodicRate * ( Math.pow((1 + periodicRate), numberOfPayments) ));
        return discountFactor;
    }
    return 0;
};
// IF(PaymentsPerYear=1,1,MATCH(0.01,End_Bal,-1)+1)),"")
// @param {number} paymentPerYear - number of payments per year, typical default to 12
// @param (number) endBalance - ending balance for each payment
const calulateActualPaymentNumber = (paymentPerYear, endBalance) => {
    if (paymentPerYear === 1) {
        return 1;
    } 
    return endBalance-1;
};
// Calculate interest on payment per period
// @param {number} rate - interest rate percent
// @param {number} payments - payments per year value, typical default to 12 
const calculatePeriodicInterest = (rate, payments) => {
    console.log(rate + ' pmt: '+payments);
    if(rate && payments > 0){
       const periodicInterest = rate / 100 / payments;
       return periodicInterest;
    }
    return 0;
};

// Build Loan period amortization table
// @param {object} result - JSON Object passed by published event with Input values.
const calculateAmortizationTable = (result) => {
    var count = 0;  
    var propertyTax = 0.0;
    var homeownersInsurance = 0.0;
    var totalPayment = 0.0;
    var monthLoanBalance = 0.0;
    var displayLoanBalance = 0.0;
    var monthInterest = 0.0;
    var monthPrincipal = 0.0;
    var monthEndBalance = 0.0;
    var cumulativeInterest = 0.0;
    var testDate;
    var actualNumberPayments = 0;
    // Return data
    var data = new Array();
    var resultData;
    // Calculation vaues to return
    var totalEarlyPayments = 0.0;
    var totalPayments = 0.0;
    var interestSavings = 0.0;
    var additionalPrincipal = 0.0;

    if (result){
        testDate = result.repaymentStartDate;
        monthLoanBalance = result.loanAmount;
        displayLoanBalance = result.loanAmount;
        additionalPrincipal = result.additionalPrincipal;
        totalPayment = result.monthlyPayment + result.additionalPrincipal;
        propertyTax = result.propertyTax / result.paymentPerYear;
        homeownersInsurance = result.homeownersInsurance / result.paymentPerYear;
        // Cycle on amortization recods build the table data and do row calculations
        for (count = 0; count < result.loanTermMonth; count++) {
            //if (count > 0){
            testDate = addMonthDate(result.repaymentStartDate, count); // TEST count+1
            //} 
            // Loan balance to display
            displayLoanBalance = monthLoanBalance;

            // Calulations
            monthInterest = calculateMonthlyInterest(monthLoanBalance,result.rateValue,result.paymentPerYear);
            cumulativeInterest += monthInterest;

            monthPrincipal = totalPayment - monthInterest;
            if (monthLoanBalance > monthPrincipal){
                monthEndBalance = calculateMonthlyEndBalance(monthLoanBalance, monthPrincipal );
                monthLoanBalance = monthLoanBalance - monthPrincipal;
            }else{
                monthEndBalance = 0.0;
                totalPayment = monthLoanBalance;
                // Adjust final Principal value for 0 balance last payment
                monthPrincipal = totalPayment - monthInterest;
                // Derive additional principal final payment may be less
                additionalPrincipal = (monthLoanBalance - result.monthlyPayment) + monthInterest;
            }
            // Calulations
            if (additionalPrincipal < 0){
                additionalPrincipal = 0; 
            }
            if (result.additionalPrincipal){
                totalEarlyPayments += additionalPrincipal;
            }

            let o = {id: count+1, // TEST +1
                              pmtdate: testDate,
                              beginbalance: displayLoanBalance, 
                              schedulepmt: result.monthlyPayment, 
                              principalapplied: additionalPrincipal, 
                              propertytax: propertyTax, 
                              homeinsurance: homeownersInsurance, 
                              totalpmt: totalPayment, 
                              principal: monthPrincipal, 
                              interest: monthInterest, 
                              endbalance: monthEndBalance, 
                              cumulativeinterest: cumulativeInterest,
                            };

                data.push(o);
                actualNumberPayments = count+1; // TEST +1
                if(totalPayment){
                   totalPayments += totalPayment;
                }
                // Stop Loop if Balance = 0 Pay off
                if (monthEndBalance === 0){
                    count = result.loanTermMonth+1;
                    // Adjust total payments with final remainbder interest
                    if(monthInterest){
                       totalPayments += monthInterest;
                    }
                }                    
        }
        // calculate savings
        // (LoanPeriod*ScheduledPayment-LoanAmount) - (TotalPayments-LoanAmount)
        interestSavings = ((result.loanTermMonth * result.monthlyPayment) - result.loanAmount) - (totalPayments - result.loanAmount);
        if( typeof interestSavings === 'undefined' || interestSavings === null ){
            interestSavings = 0.0;
        }
        resultData = {
            dataResult: data,
            actualNumberPayments: actualNumberPayments,
            totalEarlyPayments: totalEarlyPayments,
            totalInterestPaid: cumulativeInterest,
            totalPayments: totalPayments,
            interestSavings: interestSavings,
            startDate: result.repaymentStartDate,            
        };
    }
    return resultData;
};

// Sample data method
const fetchData = () => {
    return [
        {id: 1, name: 'Scheduled P&I payment', amount: 1270.80},
        {id: 2, name: 'Scheduled number of payments', amount: 360},
        {id: 3, name: 'Actual number of payments', amount: 210},
        {id: 4, name: 'Years saved off original loan term', amount: 12.50},
        {id: 5, name: 'Total early payments', amount: 117086.72},
        {id: 6, name: 'Regular Principal', amount: 174913.28},
        {id: 7, name: 'Total interest Paid', amount: 90688.40},
        {id: 8, name: 'Total Payments', amount: 382688.40},
        {id: 9, name: 'Lifetime Interest Savings', amount: 74800.80},
    ];
};

module.exports = { 
    getTermOptions, 
    calculateMonthlyPayment, 
    getLoanTypeOptions, 
    calculateFHAMI,
    fetchData,
    calclatePIPayment,
    calulateActualPaymentNumber,
    calculateMonthlyInterest,
    calculatePeriodicInterest, 
    calculateMonthlyEndBalance,
    calculateAmortizationTable,
    addMonthDate,
    getTodayDate,
    calculateDiscountFactor,
    calulateBasicLoanAttributes 
};
    