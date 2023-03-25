// import libs

// import modules

// import slider

// import utils
// Create a class for Client with properties name, account number, and balance, and methods for getting balance and withdrawing money from the account.


// a program to manage a bank:

// 1. Create a class "Client" with properties "name", "account number", and "balance", and methods for getting balance and withdrawing money from the account.
class Client {
constructor(name, accountNumber, balance) {
this.name = name;
this.accountNumber = accountNumber;
this.balance = balance;
}

getBalance() {
return this.balance;
}

withdrawMoney(amount) {
if (this.balance >= amount) {
this.balance -= amount;
return amount;
} else {
return "Insufficient balance";
}
}
}

// 2. Create a class "Account" with properties "account number" and "balance", and a method for withdrawing money from the account.
class Account {
constructor(accountNumber, balance) {
this.accountNumber = accountNumber;
this.balance = balance;
}

withdrawMoney(amount) {
if (this.balance >= amount) {
this.balance -= amount;
return amount;
} else {
return "Insufficient balance";
}
}
}

// 3. Create a class "CreditAccount" that extends Account with a "credit limit" property, and methods for withdrawing money from the account and the credit limit.
class CreditAccount extends Account {
constructor(accountNumber, balance, creditLimit) {
super(accountNumber, balance);
this.creditLimit = creditLimit;
}

withdrawMoney(amount) {
if (this.balance + this.creditLimit >= amount) {
if (this.balance >= amount) {
this.balance -= amount;
} else {
this.creditLimit -= amount - this.balance;
this.balance = 0;
}
return amount;
} else {
return "Insufficient balance";
}
}
}

// 4. Create a class "DepositAccount" that extends Account with an "interest" property, and a method for adding interest to the account balance.
class DepositAccount extends Account {
constructor(accountNumber, balance, interest) {
super(accountNumber, balance);
this.interest = interest;
}

addInterest() {
this.balance += this.balance * (this.interest / 100);
return this.balance;
}
}

// 5. Create a class "Bank" with properties "name" and an array of clients, and methods for adding a new client, removing a client, and checking a client's balance.
class Bank {
constructor(name) {
this.name = name;
this.clients = [];
}

addClient(client) {
this.clients.push(client);
}

removeClient(client) {
const index = this.clients.indexOf(client);
if (index !== -1) {
this.clients.splice(index, 1);
}
}

checkBalance(client) {
const index = this.clients.indexOf(client);
if (index !== -1) {
return client.getBalance();
} else {
return "Client not found";
}
}
}


// 6. In the main program, create a Bank object and add some clients with different types of accounts.

const bank = new Bank("My Bank");

// create a client with a regular account
const client1 = new Client("John Smith", "123456", 5000);
bank.addClient(client1);

// create a client with a credit account
const client2 = new CreditAccount("Jane Doe", "654321", 1000, 5000);
bank.addClient(client2);

// create a client with a deposit account
const client3 = new DepositAccount("Bob Johnson", "987654", 20000, 5);
bank.addClient(client3);

// 7. Test the program by checking the balance of each client and making some withdrawals.

// check the balance of client1
console.log(`${client1.name}'s balance is ${bank.checkBalance(client1)}`);

// withdraw 2000 from client1's account
const amountWithdrawn = client1.withdrawMoney(2000);
console.log(`${amountWithdrawn} withdrawn from ${client1.name}'s account. New balance is ${bank.checkBalance(client1)}`);

// check the balance of client2
console.log(`${client2.name}'s balance is ${bank.checkBalance(client2)}`);

// withdraw 5000 from client2's account
const amountWithdrawn2 = client2.withdrawMoney(5000);
console.log(`${amountWithdrawn2} withdrawn from ${client2.name}'s account. New balance is ${bank.checkBalance(client2)}`);

// withdraw 6000 from client2's account
const amountWithdrawn3 = client2.withdrawMoney(6000);
console.log(`${amountWithdrawn3} withdrawn from ${client2.name}'s account. New balance is ${bank.checkBalance(client2)}`);

// check the balance of client3
console.log(`${client3.name}'s balance is ${bank.checkBalance(client3)}`);

// add interest to client3's account
const balanceWithInterest = client3.addInterest();
console.log(`Interest added to ${client3.name}'s account. New balance is ${balanceWithInterest}`);

document.addEventListener('DOMContentLoaded', () => {
  // code to execute when the DOM is ready
});

