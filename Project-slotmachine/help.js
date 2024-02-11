// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. check if the user won
// 6. give the user their winnings
// 7. play again

const prompt = require('prompt-sync')();


const rows = 3;
const cols = 3;

const symbolscount = {
    'A': 2,
    'B': 4,
    'C': 6,
    'D': 8
};

const symbolvalues = {
    'A': 5,
    'B': 4,
    'c': 3,
    'D': 2
};






const deposit = () => {
    while (true) {
    const depositAmount = prompt('Enter a deposit amount: ');
    const numberDepositAmount = parseFloat(depositAmount);

    if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
        console.log('Invalid deposit amount, try again.');
    } else {
        return numberDepositAmount;
    }
}  
};

const getNumberofLines = () => {
    while (true) {
        const lines = prompt('Enter the number of lines to bet on (1-3): ');
        const numberofLines = parseFloat(lines);
    
        if (isNaN(numberofLines) || numberofLines <= 0 || numberofLines > 3) {
            console.log('Invalid number of lines, try again.');
        } else {
            return numberofLines;
        }
    }  
};

const getBet = (balance, lines) => {
    while (true) {
        const bet = prompt('Enter the bet per line: ');
        const numberBet = parseFloat(bet);
    
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log('Invalid bet, try again.');
        } else {
            return numberBet;
        }
    }  
};

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(symbolscount)){
        for(let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    
    const reels = [];
    for (let i = 0; i < cols;i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < rows; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
};


const transpose = (reels) => {
    const rowswith = [];

    for (let i = 0; i < rows; i++) {
        rowswith.push([]);
        for (let j = 0; j < cols; j++) {
            rowswith[i].push(reels[j][i]);
        }
    }

    return rowswith;
};

const printRows = (rowswith) => {
    for (const row of rowswith) {
        let rowString = '';
        for(const [i, symbol] of row.entries()) {
            rowString += symbol
            if (i != row.length - 1) {
                rowString += ' | '
            }
        }
        console.log(rowString)
    }
};

const getWinnings = (rowswith, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row< lines; row++){
        const symbols = rowswith[row];
        let allSame = true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }

        if(allSame) {
            winnings += bet * symbolvalues[symbols[0]]
        }
    }

    return winnings;
};

const game = () => {
    let balance  = deposit();

    while (true) {
        console.log('Youre current balance is $' + balance);
const numberofLines = getNumberofLines();
const bet = getBet(balance, numberofLines);
balance -= bet * numberofLines;
const reels = spin();
const rowswith = transpose(reels);
printRows(rowswith);
const winnings = getWinnings(rowswith, bet, numberofLines);
balance += winnings;
console.log('You won, $' + winnings.toString());

if (balance <= 0) {
    console.log('No more money left, pls go and get some more money! LLL');
    break;
}

const playAgain = prompt('Do you want to play again (y/n)?')

if (playAgain != 'y') break;
    }
};


game();


