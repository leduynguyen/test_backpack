// Trading mode
// 0: Farm until running out of money
// 1: Stop when the remaining balance is a certain amount
// 2: Stop after farming a certain number of times
const tradeType = 2;

// When the remaining USDC balance is below this value, the script will make the last purchase and stop
const stopUsdc = 0;
// Set the number of transactions including buying or selling
const stopTradeAmount = 20;

let timer;
let counter = 1;
const trade = async () => {

   let isLastest = false;
   if (tradeType === 1) {
      const balanceArray = document.getElementsByClassName('_ls-167744059')[5].textContent.split(' ');
      const balance = balanceArray[0];
      if (parseFloat(balance) < stopUsdc) {
         console.log(`Remaining balance is lower than ${stopUsdc} USDC, stopping`)
         isLastest = true;
      }
   } else if (tradeType === 2) {
      if (counter === stopTradeAmount) {
         console.log(`Number of program executions has reached ${stopTradeAmount}, stopping`)
         isLastest = true;
      }
   }

   // Before buying
   console.log(`Attempting to buy, current trade count: ${counter}`);
   document.getElementsByClassName('bg-baseBackgroundL1')[3].click();
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-greenPrimaryButtonBackground')[0].click()
   await new Promise(resolve => setTimeout(resolve, 1000));
   console.log(`Buy action executed`);

   if (isLastest) {
      console.log('Ready to stop');
      clearInterval(timer);
      return;
   }

   // Before selling
   console.log(`Attempting to sell, current trade count: ${counter}`);
   document.getElementsByClassName('border-b-baseBorderMed')[0].click()
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-baseBackgroundL1')[3].click();
   await new Promise(resolve => setTimeout(resolve, 100));
   document.getElementsByClassName('bg-redPrimaryButtonBackground')[0].click()
   await new Promise(resolve => setTimeout(resolve, 1000));
   document.getElementsByClassName('border-b-baseBorderMed')[0].click()
   console.log(`Sell action executed`);
   
   counter++;
   console.log(`Trade count updated: ${counter}`);
}

timer = setInterval(trade, 8000)
