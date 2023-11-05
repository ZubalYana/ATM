function userCard(id){
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];

    function recordOperations(type, value, time){
        historyLogs.push({
            operationType: type,
            operationValue: value,
            operationTime: time
        });
    }

    return {
        getCardOptions(){
            return{
                id,
                balance,
                transactionLimit,
                historyLogs
            }
        },
        putCredits(amount){
            if(amount<=transactionLimit){
                balance += amount;
                recordOperations('Received credits', amount, new Date().toLocaleString());
            }else{
                console.log('Expeded Limit')
            }
        },
        takeCredits(amount){
            if(amount<=transactionLimit && amount<=balance){
                balance -= amount;
                recordOperations('Taked credits', amount, new Date().toLocaleString());
            }else{
                console.log('Expeded Limit')
            }
        },
        setTransactionLimit(amount){
            transactionLimit = amount;
            recordOperations('Changed limit', amount, new Date().toLocaleString());
        },
        transferCredits(amount, recipientCard){
            const tax = 0.005;
            let transferAmount = amount * tax + amount;
            if(transferAmount <= balance && transferAmount <= transactionLimit){
                if(transactionLimit <= balance){
                    this.takeCredits(transferAmount);
                    recipientCard.putCredits(amount)
                }else{
                    console.log(`Sorry, not enough money`)
                }
            }else{
                console.log(`Exceded limit`)
            }
            card1.takeCredits(amount );
            recipientCard.putCredits(amount)
            recordOperations('Sended money', amount, new Date().toLocaleString());
        }
    }
}

let card1 = new userCard(5550208890011118);
let card2 = new userCard(2200044555010100);


// console.log(card1.getCardOptions())
// card1.putCredits(50)
// console.log(card1.getCardOptions())
// card1.takeCredits(100)
// console.log(card1.getCardOptions())
// card1.setTransactionLimit(300)
// console.log(card1.getCardOptions())
// card1.putCredits(300)
// console.log(card1.getCardOptions())
// card1.takeCredits(300)
// console.log(card1.getCardOptions())
card1.transferCredits(50, card2)
console.log(card1.getCardOptions())
console.log(card2.getCardOptions())





$('.welcomeScreen_input').hide(0);
$('.welcomeScreen_button').hide(0);
$('.welcomeScreen_help_text').hide(0);

let autoTypeText = document.getElementById("autoTypeText");
let textToType = "Hello, please enter your card number and PIN.";
let currentIndex = 0;

function typeText() {
    if (currentIndex < textToType.length) {
        autoTypeText.innerHTML += textToType.charAt(currentIndex);
        currentIndex++;
        setTimeout(typeText, 100); 
    }else{
        $('.welcomeScreen_input').slideDown(300)
        setTimeout(() => {
            $('.welcomeScreen_button').slideDown(300)
        }, 1000);
        setTimeout(() => {
            $('.welcomeScreen_help_text').slideDown(300)
        }, 2000);
    }

}

typeText();

function checkCardData(){
    let cardNumberValue = $('#cardNumber').val();
    let cardPINValue = $('#cardPIN').val();

}
