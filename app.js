const currencies = {
    uk: {
      symbol: "£",
      netPayLabel: "Monthly Net Take-Home Pay (£):",
      itemPriceLabel: "Item Price (£):",
      defaultNetPay: 2400,
      defaultPrice: 500
    },
    us: {
      symbol: "$",
      netPayLabel: "Monthly Net Take-Home Pay ($):",
      itemPriceLabel: "Item Price ($):",
      defaultNetPay: 3000,
      defaultPrice: 600
    },
    eu: {
      symbol: "€",
      netPayLabel: "Monthly Net Take-Home Pay (€):",
      itemPriceLabel: "Item Price (€):",
      defaultNetPay: 2500,
      defaultPrice: 550
    }
  };
  
  let currentCurrency = 'uk';
  
  function switchCurrency(newCurrency) {
    currentCurrency = newCurrency;
    const cData = currencies[currentCurrency];
  
    document.getElementById("netPayLabel").textContent = cData.netPayLabel;
    document.getElementById("itemPriceLabel").textContent = cData.itemPriceLabel;
  
    document.getElementById("netPayInput").placeholder = `e.g. ${cData.defaultNetPay}`;
    document.getElementById("priceSlider").value = cData.defaultPrice;
    document.getElementById("priceOutput").textContent = cData.defaultPrice;
  
    updateCalculation();
  }
  
  function updateCalculation() {
    const cData = currencies[currentCurrency];
    
    const netPay = parseFloat(document.getElementById("netPayInput").value) || 0;
    const hoursPerDay = parseFloat(document.getElementById("hoursPerDayInput").value) || 0;
    const priceSlider = document.getElementById("priceSlider");
    const price = parseFloat(priceSlider.value) || 0;
    const priceOutput = document.getElementById("priceOutput");
    const resultDisplay = document.getElementById("resultDisplay");
  
    priceOutput.textContent = price.toLocaleString('en-GB');
  
    if (netPay <= 0 || hoursPerDay <= 0) {
      resultDisplay.innerHTML = "<p>Please enter valid numbers for pay and hours.</p>";
      return;
    }
  
    const monthlyHours = hoursPerDay * 5 * 4.33;
    const hourlyNet = netPay / monthlyHours;
    const hoursNeeded = price / hourlyNet;
    const daysNeeded = hoursNeeded / hoursPerDay;
  
    let resultText = "";
    if (isNaN(hoursNeeded) || !isFinite(hoursNeeded)) {
      resultText = "Cannot compute. Check the values entered.";
    } else {
      const hoursRounded = hoursNeeded.toFixed(1);
      const daysRounded = daysNeeded.toFixed(1);
      const symbol = cData.symbol;
  
      resultText = `
        You need about 
        <span class="highlight">${hoursRounded} hour(s)</span> of work 
        (<span class="highlight">${daysRounded} day(s)</span>) 
        to afford an item costing ${symbol}${price.toLocaleString('en-GB')}.
      `;
    }
  
    resultDisplay.innerHTML = `<p>${resultText}</p>`;
  }
  
  window.onload = () => {
    switchCurrency(currentCurrency);
  };
  