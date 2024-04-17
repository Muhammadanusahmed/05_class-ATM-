#! /usr/bin/env node

import inquirer from "inquirer"

let MyPin = 1234;
let MyBalance = 10000; //Dollar
let fastcaseop1: number = 1000;
let fastcaseop2: number = 2000;
let fastcaseop3: number = 3000;
let fastcaseop4: number = 4000;

let TransactionHistory: { type: string; amount: number; timestamp: Date }[] =
  [];

async function main() {
  let PinAnswer = await inquirer.prompt({
    name: "MainPin",
    type: "number",
    message: "enter your pin number",
  });

  if (PinAnswer.MainPin === MyPin) {
    console.log("    [WELLCOME]");

    while (true) {
      let ListOperator = await inquirer.prompt({
        name: "operator",
        type: "list",
        message: "what do you want",
        choices: [
          "current balance",
          "fast cash",
          "withdraw",
          "transaction history",
          "Exit",
        ],
      });

      if (ListOperator.operator === "current balance") {
        console.log(`your amount is : ${MyBalance} `);
      } else if (ListOperator.operator === "fast cash") {
        let fastCashOperator = await inquirer.prompt({
          name: "fastcase",
          type: "list",
          message: "select your withdraw money",
          choices: ["1000", "2000", "3000", "4000"],
        });

        if (fastCashOperator.fastcase === "1000") {
          MyBalance -= fastcaseop1;
          console.log(`your balance is now ${MyBalance}`);

          TransactionHistory.push({
            type: "fast cash",
            amount: fastcaseop1,
            timestamp: new Date(),
          });
        } else if (fastCashOperator.fastcase === "2000") {
          MyBalance -= fastcaseop2;
          console.log(`your balance is now ${MyBalance}`);

          TransactionHistory.push({
            type: "fast cash",
            amount: fastcaseop2,
            timestamp: new Date(),
          });
        } else if (fastCashOperator.fastcase === "3000") {
          MyBalance -= fastcaseop3;
          console.log(`your balance is now ${MyBalance}`);

          TransactionHistory.push({
            type: "fast cash",
            amount: fastcaseop3,
            timestamp: new Date(),
          });
        } else if (fastCashOperator.fastcase === "4000") {
          MyBalance -= fastcaseop4;
          console.log(`your balance is now ${MyBalance}`);

          TransactionHistory.push({
            type: "fast cash",
            amount: fastcaseop4,
            timestamp: new Date(),
          });
        }
      } else if (ListOperator.operator === "withdraw") {
        let WithDrawOperator = await inquirer.prompt({
          name: "WithDrawAmount",
          type: "number",
          message: "WithDraw Amount?",
        });
        if (WithDrawOperator.WithDrawAmount > MyBalance) {
          console.log(`Insufficient balance!`);
        } else {
          MyBalance -= WithDrawOperator.WithDrawAmount;
          console.log(`your balance is now ${MyBalance}`);
          TransactionHistory.push({
            type: "withdraw",
            amount: WithDrawOperator.WithDrawAmount,
            timestamp: new Date(),
          });
        }
      } else if (ListOperator.operator === "transaction history") {
        console.log("Transaction History:");
        TransactionHistory.forEach((transaction) => {
          console.log(
            `${transaction.timestamp.toLocaleString()} - ${
              transaction.type
            }: $${transaction.amount}`
          );
        });
        console.info(TransactionHistory);
      } else if (ListOperator.operator === "Exit") {
        break;
      }
    }
  } else {
    console.log(`wrong pin code`);
  }
}
main();
