// Exchange rates for demonstration purposes
const exchangeRates = {
  usd: {
    eur: 0.85,
    gbp: 0.75,
    inr: 83,       
  },
  eur: {
    usd: 1.18,
    gbp: 0.89,
    inr: 91,       
  },
  gbp: {
    usd: 1.33,
    eur: 1.12,
    inr: 106,      
  },
  inr: {
    usd: 1/83,     
    eur: 1/91,     
    gbp: 1/106     
  }
};

// window.onload = function() {
//   let amount = getElementById("amount");
//   console.log(amount+ " amount");

// }

function convertCurrency() {

  let amount = document.getElementById("amount").value;
  console.log(amount+ " amount");

  let fromCurrency = document.getElementById("from").value;
  console.log(fromCurrency+" fromCurrency");

  let toCurrency = document.getElementById("to").value;
  console.log(toCurrency+" toCurrency");

  if (fromCurrency === toCurrency) {
    alert("From and To currencies cannot be the same!");
    return;
  }

  let convertedValue = exchangeRates[fromCurrency][toCurrency] * amount;
  console.log(convertedValue);

  document.getElementById("result").innerText = convertedValue.toFixed(2);
}