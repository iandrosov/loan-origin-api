# loan-origin-api
Sample Loan origination system API, demo calculation methods in NodeJS. Implimentation of Loan calculation ammortization table example.

Using Swagger Open API Spec for definition language and Swagger API Documentation.

## Use
Deploy application to Heroku for quick start or run it local, (requires Node).

Access Swagger API documentation Heroku example URL: [Loan API Docs](https://loan-origin-api-stage.herokuapp.com/docs/) 

## Examples

For testing these API examples with CURL and API on Heroku app.

Calculate preiodic interest with rate 4.3% and 12 yearly payments [Live preiodic interest URL](https://loan-origin-api-stage.herokuapp.com/api/periodicinterest?rate=4.3&payments=12)

```
curl -X GET "http://localhost:8080/api/periodicinterest?rate=4.3&payments=12" -H "accept: application/json"
```
result: `{    "value": "0.00033333" }`

Calculate discount factor for 30 year loan with periodic interest rate of 4% and 360 payment (30Year loan) [Live URL](https://loan-origin-api-stage.herokuapp.com/api/discountfactor?numberOfPayments=360&periodicRate=4)

```
curl -X GET "http://localhost:8080/api/discountfactor?numberOfPayments=360&periodicRate=4" -H "accept: application/json"
```
result: `{
    "value": "0.2500"
}`

Calculat FHA MI for 30 year loan term (360 payments) and FHA MI 250,000 [Live URL](https://loan-origin-api-stage.herokuapp.com/api/fhami?loanTermMonth=360&fhaMI=250000)

```
curl -X GET "http://localhost:8080/api/fhami?loanTermMonth=360&fhaMI=250000" -H "accept: application/json"
```
result: `{"FHAMI": 90000000}`

Calculate pricipal PI Payment with principal $250,000 and discount 0.25 [Live URL](https://loan-origin-api-stage.herokuapp.com/api/pipayment?principal=250000&discount=0.25) 

```
curl -X GET "http://localhost:8080/api/pipayment?principal=250000&discount=0.25" -H "accept: application/json"
```
result: `{
    "value": "1000000.00"
}`

Calculate basci loan attributes principal $200,000, rate: 4.3%, term: 30 years, property tax: $1700, Insurance: $2100 [Live URL](https://loan-origin-api-stage.herokuapp.com/api/loanbasic?principal=200000.00&rate=4.3&term=30&propertyTax=1700&homeownersInsurance=2100)

```
curl -X GET "http://localhost:8080/api/loanbasic?principal=200000.00&rate=4.3&term=30&propertyTax=1700&homeownersInsurance=2100" -H "accept: application/json"
```
result:

```
{
    "principal": 200000,
    "rate": 4.3,
    "loanTermMonth": 360,
    "paymentPerYear": 12,
    "periodicInterest": 0.003583333333333333,
    "discountFactor": 202.0726830147911,
    "monthlyPayment": 989.7428836799312,
    "totalEscrowMonthly": 316.66666666666663,
    "totalMonthlyPayment": 1306.4095503465978
}
```

