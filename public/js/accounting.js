const moneyCount = document.getElementById('money');
const chipCount = document.getElementById('chips');
const btnDeposit = document.getElementById('deposit');
const btnWithdraw = document.getElementById('withdraw');
const message = document.getElementById('status');
const amount = document.getElementById('amount');
var chips = 0;
var money = 0;

window.onload = function () {
    getFunds();

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;
}

const getFunds = function () {
    chips = parseInt(localStorage.getItem("chips"));
    money = parseInt(localStorage.getItem("money"));
    if (chips == null) {
        console.log("Set Chips");
        localStorage.setItem("chips", 100);
        chips = 100;
    }
    if (money == null) {
        localStorage.setItem("money", 100);
        money = 100;
    }

}

var funds = 0;

const addFunds = function(){
    getFunds();

    if (chips <= 0){
        message.innerHTML = "No chips left to cash out!"
        return;
    }

    if(amount.value == ""){
        message.innerHTML = "Please enter a value!"
        return;
    }

    funds = parseInt(amount.value);
    money += funds;
    chips -= funds;

    console.log(money, chips);

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;

    message.innerHTML = `You have added ${funds} to your money!`

    localStorage.setItem("chips", parseInt(chipCount.innerHTML));
    localStorage.setItem("money", parseInt(moneyCount.innerHTML));
}

const takeFunds = function(){
    getFunds();
    
    if(amount.value == ""){
        message.innerHTML = "Please enter a value!"
        return;
    }

    funds = parseInt(amount.value);
    money -= funds;
    chips += funds;

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;
    message.innerHTML = `You have added ${funds} to your chips!`
    
    localStorage.setItem("chips", parseInt(chipCount.innerHTML));
    localStorage.setItem("money", parseInt(moneyCount.innerHTML));
}

btnDeposit.addEventListener('click',addFunds)
btnWithdraw.addEventListener('click',takeFunds)
