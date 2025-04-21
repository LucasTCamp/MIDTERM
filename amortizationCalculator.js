let button1 = document.getElementById("button1");
let output = document.getElementById("results");


button1.addEventListener("click", function() {
    let origLoan = parseFloat(prompt("Enter loan amount"));
    let downPayment = parseFloat(prompt("Give the down payment"));
    let loanTerm = parseInt(prompt("Give loan term (15 or 30)"));
    if(loanTerm !== 15 && loanTerm !== 30) {
        alert("MUST BE 15 OR 30");
        return;
    }

    let downAmount = origLoan * (downPayment/100);
    let principalAmount = origLoan - downAmount;
    let rate = 0.0575/12;
    let totalMonths = loanTerm * 12
    
    let monthlyPayment = ((rate * principalAmount) / (1 - Math.pow(1 + rate, -totalMonths))).toFixed(2);
    let monthlyNum = parseFloat(monthlyPayment)
    let interestTotal = (monthlyNum * totalMonths) - principalAmount
    let totalLoanCost = principalAmount + interestTotal;
    
    output.textContent = `Loan Term: ${loanTerm} years`;
    let rateP = document.createElement('p');
    
    rateP.textContent = `Annual Interest rate: 5.75%`;
    let amountP = document.createElement('p');
    
    amountP.textContent = `Principle Loan amount: ${principalAmount.toFixed(2)}`;
    let interestP = document.createElement('p');
    
    interestP.textContent = `Total Interest: ${interestTotal.toFixed(2)}`;
    let totalCostP = document.createElement('p');
    totalCostP.textContent = `Total Loan Cost: ${totalLoanCost.toFixed(2)}`;

    output.appendChild(rateP);
    output.appendChild(amountP);
    output.appendChild(interestP);
    output.appendChild(totalCostP);

    let remaining = principalAmount;
    for(let month = 1; month <= totalMonths; month++) {
        let interestPaid = remaining * rate;
        let PrinciplePaid = monthlyNum - interestPaid
        remaining -= PrinciplePaid

        let table = document.createElement('p');
        table.textContent = `Month: ${month} Payment: $${monthlyNum.toFixed(2)} Interest: $${interestPaid.toFixed(2)} Principal: $${PrinciplePaid.toFixed(2)} Remaining: $${remaining}`;
        output.appendChild(table);
        if(remaining <= 0) break;
    }

    let done = document.createElement('p');
    done.textContent = "This ends the Amortization Calculator..."
    output.appendChild(done);
});

