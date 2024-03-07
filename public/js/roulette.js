const betChoice = document.getElementById('betOption');
const chipCount = document.getElementById('chips');
const btnEven = document.getElementById('even');
const btnOdd = document.getElementById('odd');
const btnBlack = document.getElementById('black');
const btnRed = document.getElementById('red');
const btnPlay = document.getElementById('play');
const betInput = document.getElementById('bet');
const betAmount = document.getElementById('money');
const btnBetInput = document.getElementById('moneyInput');
const btnChoiceInput = document.getElementById('numInput');
const message = document.getElementById('status');


let chips = 1000;
let betNums = [];
let inputTotal = 0;
var bet = 0;
let playerChoice = 0;
var selectedNum

const rouletteNum = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
];

const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35
];


const redNumbers = [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
];

const evenNumbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36];

const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35];



const betSelector = function(){
    bet = betAmount.value;
    if(bet > chips){
        betChoice.innerHTML = chips;
    }else{
        betChoice.innerHTML = bet;  
    }
}



const play = function() {

    if(bet == 0){
        message.innerHTML = "Please Enter a Bet.";
    }else if( bet > chips){
        message.innerHTML = "Not enough chips for bet.";
    }
    bet = betAmount.value;
    var selectedNum = Math.floor( Math.random() * rouletteNum.length);
    console.log(selectedNum);


    switch(playerChoice){
        case 'choice':
            console.log("Player bets choice");
            break;
        case 'even':
            console.log("Player bets even");
            if(arrayFinder(evenNumbers, selectedNum)){
                console.log("You Win!")
                message.innerHTML = `You Win ${bet} dollars!`
                bet = bet * 2;
                chips = chips + bet;
                chipCount.innerHTML = chips;
            }else{
                console.log("You Lose!")
                message.innerHTML = "You lose!"
                chips = chips - bet;
                chipCount.innerHTML = chips;
            }
            break;
        case 'odd':
            console.log("Player bets odd");
            if(arrayFinder(oddNumbers, selectedNum)){
                console.log("You Win!")
                message.innerHTML = `You Win ${bet} dollars!`
                bet = bet * 2;
                chips = chips + bet;
                chipCount.innerHTML = chips;
            }else{
                console.log("You Lose!")
                message.innerHTML = "You lose!"
                chips = chips - bet;
                chipCount.innerHTML = chips;
            }
            break;
        case 'red':
            console.log("Player bets red");
            if(arrayFinder(redNumbers, selectedNum)){
                console.log("You Win!")
                message.innerHTML = `You Win ${bet} dollars!`
                bet = bet * 2;
                chips = chips + bet;
                chipCount.innerHTML = chips;
            }else{
                console.log("You Lose!")
                message.innerHTML = "You lose!"
                chips = chips - bet;
                chipCount.innerHTML = chips;
            }
            break;
        case 'black':
            console.log("Player bets black");
            if(arrayFinder(blackNumbers, selectedNum)){
                console.log("You Win!")
                message.innerHTML = `You Win ${bet} dollars!`
                bet = bet * 2;
                chips = chips + bet;
                chipCount.innerHTML = chips;
            }else{
                console.log("You Lose!")
                message.innerHTML = "You lose!"
                chips = chips - bet;
                chipCount.innerHTML = chips;
            }
            break;
    }
}

// const currentBet = function(){
//     choice = betInput.value;
//     betNums[inputTotal] = choice;
//     inputTotal ++;
//     playerChoice = 'choice';
//     console.log(playerChoice)
//     console.log(betNums)
//     //betChoice.innerHTML(betNums);
// }

const bettingEven = function(){
    playerChoice = 'even';
    console.log(playerChoice)
}

const bettingOdd = function(){
    playerChoice = 'odd';
    console.log(playerChoice)
}

const bettingRed = function(){
    playerChoice = 'red';
    console.log(playerChoice)
}

const bettingBlack = function(){
    playerChoice = 'black';
    console.log(playerChoice)
}

const arrayFinder = function(array, number){
    for(i= 0; i <array.length; i ++){
        if(number == array[i]){
            return true;
        }
    }
    return false;
    
}

console.log(playerChoice);
arrayFinder(rouletteNum);
btnChoiceInput.addEventListener('click', currentBet);
btnPlay.addEventListener('click', play);
btnEven.addEventListener('click', bettingEven);
btnOdd.addEventListener('click', bettingOdd);
btnRed.addEventListener('click', bettingRed);
btnBlack.addEventListener('click', bettingBlack);
btnBetInput.addEventListener('click', betSelector);

// Dozen - 3:1
// Column - 3:1
// Square Number (4-Number) - 9:1
// Split Number (2-Number) - 18:1
// Straight Number (1-Number) - 36:1