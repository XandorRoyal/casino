const moneyCount = document.getElementById('money');
const chipCount = document.getElementById('chips');
const btnDeposit = document.getElementById('deposit');
const btnWithdraw = document.getElementById('withdraw');
const message = document.getElementById('status');
const amount = document.getElementById('amount');

const getFunds = function () {
    var chips = localstorage.getItem("chips");
    var money = localstorage.getItem("money");
    if (chips == null) {
        localstorage.setItem("chips", 100);
        var chips = 100;
    }
    if (money == null) {
        localstorage.setItem("money", 100);
        var money = 100;
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

    chipCount.innerHTML = chips;
    moneyCount.innerHTML = money;

    message.innerHTML = `You have added ${funds} to your money!`
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
}

btnDeposit.addEventListener('click',addFunds)
btnWithdraw.addEventListener('click',takeFunds)
