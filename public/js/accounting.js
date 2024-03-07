const moneyCount = document.getElementById('money');
const chipCount = document.getElementById('chips');
const btnDeposit = document.getElementById('deposit');
const btnWithdraw = document.getElementById('withdraw');
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
    if (chips == null || isNaN(chips)) {
        console.log("Set Chips");
        localStorage.setItem("chips", 100);
        chips = 100;
    }
    if (money == null || isNaN(money)) {
        console.log(chips);
        localStorage.setItem("money", 100);
        money = 100;
    }

    console.log(chips, money);
}

var funds = 0;

const addFunds = function(){
    getFunds();

    if (chips <= 0){
        return;
    }

    if(amount.value == ""){
        return;
    }

    funds = parseInt(amount.value);
    money += funds;
    chips -= funds;

    console.log(money, chips);

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;
    
    localStorage.setItem("chips", parseInt(chipCount.innerHTML));
    localStorage.setItem("money", parseInt(moneyCount.innerHTML));
}

const takeFunds = function(){
    getFunds();
    
    if(amount.value == ""){
        return;
    }

    funds = parseInt(amount.value);
    money -= funds;
    chips += funds;

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;
    
    localStorage.setItem("chips", parseInt(chipCount.innerHTML));
    localStorage.setItem("money", parseInt(moneyCount.innerHTML));
}

btnDeposit.addEventListener('click',addFunds)
btnWithdraw.addEventListener('click',takeFunds)
