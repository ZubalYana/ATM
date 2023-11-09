function userCard(id, pin){
    let balance = 100;
    let transactionLimit = 100;
    let historyLogs = [];

    function recordOperations(type, value) {
        const time = new Date().toLocaleString();
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
                historyLogs,
                pin
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

let card1 = new userCard(5550208890011118, 3467);
let card2 = new userCard(2200044555010100, 2398);


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


$('#ContactUs').hover(
    function(){
    $('.welcomeScreen_contactUs_contacts_overlow').css('left', '220px')
},
function() {
    $('.welcomeScreen_contactUs_contacts_overlow').css('left', '0px');
})
$('.welcomeScreen_contactUs_contactCircles').hover(
    function(){
        $('.welcomeScreen_contactUs_contacts_overlow').css('left', '220px')
    },
    function() {
        $('.welcomeScreen_contactUs_contacts_overlow').css('left', '0px');
    }
    
)


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

function checkCardData() {


    $('#LogIn').click(function () {
        if ($('#cardNumber').val() === '5550208890011118' && $('#cardPIN').val() === '3467') {
            $('.welcomeScreen').css('display', 'none')
            $('.mainPage').css('display', 'flex')
        } else {
            alert('Incorrect card number or PIN');
            //поправити тут
        }
    });
}

checkCardData();


console.log(card1.getCardOptions().id)
let theme = 'dark'
//Add it to localStorage
$('.mainPage_theme').click(function(){
    if(theme == 'dark'){
        $('.mainPage_theme').css('justify-content', 'flex-end')
        theme = 'light'
    }else{
        $('.mainPage_theme').css('justify-content', 'flex-start')
        theme = 'dark'
    }

})

$('#CardInfoBtn').click(function(){
    $('.mainPage').css('display', 'none')
    $('.cardInfo').css('display', 'flex')

    $('#Card_id').html(`Number: ${card1.getCardOptions().id}`)
    $('#Card_balance').html(`Balance: ${card1.getCardOptions().balance}`)
    $('#Card_limit').html(`Limit: ${card1.getCardOptions().transactionLimit}`)

$('#Card_historyLogs').html(`History: ${JSON.stringify(card1.getCardOptions().historyLogs)}`);


const historyLogs = card1.getCardOptions().historyLogs;
let historyHtml = "History:<br><ul class='History_ul'>";

historyLogs.forEach(log => {
    const operationType = log.operationType;
    const operationValue = log.operationValue;
    const operationTime = log.operationTime;
    historyHtml += `<li class='History_li'>${operationType}: ${operationValue} at ${operationTime}</li>`;
});

historyHtml += "</ul>";

$('#Card_historyLogs').html(historyHtml);

    $('#Card_pin').html(`PIN: ${card1.getCardOptions().pin}`)

})

$('#cardInfo_close').click(function(){
    $('.cardInfo').css('display', 'none')
    $('.mainPage').css('display', 'flex')
})


$('#TopUpTheBalanceBtn').click(function(){
    $('.topUpBalance').css('display', 'flex')
    $('.mainPage').css('display', 'none')
})

$('#topUpBalance_close').click(function(){
    $('.topUpBalance').css('display', 'none')
    $('.mainPage').css('display', 'flex')
})

$('#TopUpBalance').click(function(){
    const amountToTopUp = $('#topUpBalance_input').val();

    if (!isNaN(amountToTopUp)) {

        card1.putCredits(parseFloat(amountToTopUp)); 
        console.log(card1.getCardOptions());
        $('.topUpBalance_textPart_fillingIn').css('display', 'none')
        $('.topUpBalance_textPart_result').css('display', 'flex')
        $('#ToppingUp_result').html(`Your balance was successfully topped up on ${amountToTopUp}$. Your balance is ${card1.getCardOptions().balance}$`)
        $('.topUpBalance_textPart_result_btn').click(function(){
            $('.topUpBalance_textPart_fillingIn').css('display', 'flex')
            $('.topUpBalance_textPart_result').css('display', 'none')
        })
    } else {
        console.log('Invalid input. Please enter a valid number.');
    }
    $('#topUpBalance_input').val('')
});






$('#WithdrawMoney').click(function(){
    $('.withdrawMoney').css('display', 'flex')
    $('.mainPage').css('display', 'none')
})

$('#withdrawMoney_close').click(function(){
    $('.withdrawMoney').css('display', 'none')
    $('.mainPage').css('display', 'flex')
})

$('#withdrawMoney').click(function(){
    const amountWithdraw = $('#withdrawMoney_input').val();

    if (!isNaN(amountWithdraw)) {

        card1.takeCredits(parseFloat(amountWithdraw)); 
        console.log(card1.getCardOptions());
        $('.withdrawMoney_textPart_fillingIn').css('display', 'none')
        $('.withdrawMoney_textPart_result').css('display', 'flex')
        $('#withdrawMoney_result').html(`Your money were successfully taked from card on ${amountWithdraw}$. Your balance is ${card1.getCardOptions().balance}$`)
        $('.withdrawMoney_textPart_result_btn').click(function(){
            $('.withdrawMoney_textPart_fillingIn').css('display', 'flex')
            $('.withdrawMoney_textPart_result').css('display', 'none')
        })
    } else {
        console.log('Invalid input. Please enter a valid number.');
    }
    $('#withdrawMoney_input').val('')
});





$('#TopUpYourAccount').click(function(){
    $('.TopUpYourAc').css('display', 'flex')
    $('.mainPage').css('display', 'none')
})

$('#TopUpYourAc_close').click(function(){
    $('.TopUpYourAc').css('display', 'none')
    $('.mainPage').css('display', 'flex')
})


$('#TopUpAccBtn').click(function(){


    const amountWithdrawForPhone = $('#TopUpYourAc_Amountinput').val();
    const phoneNumber = $('#TopUpYourAc_Numberinput').val();

    if (!isNaN(amountWithdrawForPhone)) {

        card1.takeCredits(parseFloat(amountWithdrawForPhone)); 
        console.log(card1.getCardOptions());
        $('.TopUpYourAc_textPart_fillingIn').css('display', 'none')
        $('.TopUpYourAc_textPart_result').css('display', 'flex')
        $('#TopUpYourAc_result').html(`Your phone account ( ${phoneNumber} ) was successfully topped up on ${amountWithdrawForPhone}$. Your balance is ${card1.getCardOptions().balance}$`)
        $('.TopUpYourAc_textPart_result_btn').click(function(){
            $('.TopUpYourAc_textPart_fillingIn').css('display', 'flex')
            $('.TopUpYourAc_textPart_result').css('display', 'none')
        })
    } else {
        console.log('Invalid input. Please enter a valid number.');
    }
    $('#TopUpYourAc_Numberinput').val('')
    $('#TopUpYourAc_Amountinput').val('')
})





$('#SendMoney').click(function(){
    $('.SendMoney').css('display', 'flex')
    $('.mainPage').css('display', 'none')
})

$('#SendMoney_close').click(function(){
    $('.SendMoney').css('display', 'none')
    $('.mainPage').css('display', 'flex')
})


$('#SendMoneyBtn').click(function(){
    
    const CardNumber = $('#SendMoney_inputCard').val();
    const MoneyToSend = $('#SendMoney_inputAmount').val();

    if (!isNaN(MoneyToSend)) {

        card1.transferCredits(MoneyToSend, card2); 
        console.log(card1.getCardOptions());
        $('.SendMoney_textPart_fillingIn').css('display', 'none')
        $('.SendMoney_textPart_result').css('display', 'flex')
        $('#SendMoney_result').html(`Money of amount of ${MoneyToSend}$ were successfully sended to ${CardNumber}. Your balance is ${card1.getCardOptions().balance}$`)
        $('.SendMoney_textPart_result_btn').click(function(){
            $('.SendMoney_textPart_fillingIn').css('display', 'flex')
            $('.SendMoney_textPart_result').css('display', 'none')
        })
    } else {
        console.log('Invalid input. Please enter a valid number.');
    }
    $('#SendMoney_inputCard').val('')
    $('#SendMoney_inputAmount').val('')
})